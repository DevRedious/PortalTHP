"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type Profile } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import Image from "next/image";
import { uploadProfile, uploadAvatar } from "@/lib/ipfs";
import { 
  useAccount, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useEstimateGas,
  useGasPrice,
  useChainId,
} from "wagmi";
import { encodeFunctionData } from "viem";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";
import { toast } from "sonner";
import { ConfirmationModal } from "./confirmation-modal";
import { Loader2, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { trackProfileCreated } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n-context";

type UploadProgress = {
  stage: "idle" | "avatar" | "profile" | "transaction" | "complete";
  progress: number;
};

export function ProfileForm({ initialData }: { initialData?: Profile }) {
  const { t } = useI18n();
  const { address } = useAccount();
  const chainId = useChainId();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingData, setPendingData] = useState<Profile | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    stage: "idle",
    progress: 0,
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  });

  const stackTags = watch("stackTags") || [];

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Estimation du gas
  const { data: gasPrice } = useGasPrice();
  const encodedData = pendingData && showConfirmation
    ? encodeFunctionData({
        abi: THP_PROFILE_REGISTRY_ABI,
        functionName: "setProfile",
        args: ["ipfs://placeholder", isPublic],
      })
    : undefined;
  
  const { data: estimatedGas, isLoading: isEstimatingGas } = useEstimateGas({
    to: getContractAddress(),
    data: encodedData,
    query: {
      enabled: !!pendingData && showConfirmation && !!encodedData,
    },
  });

  // Notifications pour les transactions
  useEffect(() => {
    if (writeError) {
      const errorMessage = writeError.message || t.form.errors.unknown;
      
      if (errorMessage.includes("user rejected") || errorMessage.includes("User rejected")) {
        toast.error(t.form.errors.transactionRejected, {
          description: t.form.errors.transactionCancelled,
        });
      } else if (errorMessage.includes("insufficient funds") || errorMessage.includes("insufficient balance")) {
        toast.error(t.form.errors.insufficientFunds, {
          description: t.form.errors.insufficientFundsDescription,
        });
      } else if (errorMessage.includes("network") || errorMessage.includes("Network")) {
        toast.error(t.form.errors.networkError, {
          description: t.form.errors.networkErrorDescription,
        });
      } else {
        toast.error(t.form.errors.transactionError, {
          description: errorMessage,
        });
      }
      setShowConfirmation(false);
      setUploadProgress({ stage: "idle", progress: 0 });
    }
  }, [writeError]);

  useEffect(() => {
    if (isPending) {
      toast.loading(t.form.loading.transactionPending, {
        description: t.form.loading.transactionPendingDescription,
        id: "transaction-pending",
      });
      setUploadProgress({ stage: "transaction", progress: 50 });
    }
  }, [isPending]);

  useEffect(() => {
    if (isConfirming) {
      toast.loading(t.form.loading.transactionConfirming, {
        description: "En attente de la confirmation sur la blockchain.",
        id: "transaction-confirming",
      });
      setUploadProgress({ stage: "transaction", progress: 75 });
    }
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed && hash && address) {
      toast.success(t.form.success.profileSaved, {
        description: `${t.form.success.transactionConfirmed}: ${hash.slice(0, 10)}...${hash.slice(-8)}`,
        id: "transaction-success",
      });
      setUploadProgress({ stage: "complete", progress: 100 });
      setShowConfirmation(false);
      setPendingData(null);
      
      // Track la création du profil
      trackProfileCreated(address);
      
      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setUploadProgress({ stage: "idle", progress: 0 });
      }, 2000);
    }
  }, [isConfirmed, hash, address]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t.form.errors.fileTooLarge, {
          description: "L'avatar ne doit pas dépasser 5MB.",
        });
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addStackTag = () => {
    const input = document.getElementById("stackTagInput") as HTMLInputElement;
    const tag = input?.value.trim();
    if (tag && !stackTags.includes(tag)) {
      setValue("stackTags", [...stackTags, tag]);
      input.value = "";
    }
  };

  const removeStackTag = (tag: string) => {
    setValue(
      "stackTags",
      stackTags.filter((t) => t !== tag)
    );
  };

  const onSubmit = async (data: Profile) => {
    if (!address) {
      toast.error(t.form.errors.walletNotConnected, {
        description: "Veuillez connecter votre wallet pour continuer.",
      });
      return;
    }

    // Stocker les données pour la confirmation
    setPendingData(data);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    if (!address || !pendingData) return;

    try {
      setShowConfirmation(false);
      let avatarCID = pendingData.avatarCID;

      // Upload avatar si nouveau
      if (avatarFile) {
        setUploadProgress({ stage: "avatar", progress: 0 });
        toast.loading(t.form.loading.avatarUpload, {
          description: "Téléchargement sur IPFS via Pinata.",
          id: "avatar-upload",
        });

        try {
          avatarCID = await uploadAvatar(avatarFile);
          setUploadProgress({ stage: "avatar", progress: 100 });
          toast.success(t.form.success.avatarUploaded, {
            description: `CID: ${avatarCID.slice(0, 10)}...`,
            id: "avatar-success",
          });
        } catch (error: any) {
          const errorMessage = error?.message || t.form.errors.uploadUnknown;
          toast.error(t.form.errors.avatarUploadFailed, {
            description: errorMessage.includes("Pinata") 
              ? t.form.errors.pinataError
              : errorMessage,
            id: "avatar-error",
          });
          setUploadProgress({ stage: "idle", progress: 0 });
          return;
        }
      }

      // Préparer le profil pour IPFS
      const profileIPFS = {
        ...pendingData,
        avatarCID,
        version: "1.0" as const,
        updatedAt: new Date().toISOString(),
      };

      // Upload du profil sur IPFS
      setUploadProgress({ stage: "profile", progress: 0 });
      toast.loading(t.form.loading.profileUpload, {
        description: "Téléchargement sur IPFS via Pinata.",
        id: "profile-upload",
      });

      let cid: string;
      try {
        cid = await uploadProfile(profileIPFS);
        setUploadProgress({ stage: "profile", progress: 100 });
        toast.success(t.form.success.profileUploaded, {
          description: `CID: ${cid.slice(0, 10)}...`,
          id: "profile-success",
        });
      } catch (error: any) {
        const errorMessage = error?.message || t.form.errors.uploadUnknown;
        toast.error(t.form.errors.profileUploadFailed, {
          description: errorMessage.includes("Pinata")
            ? t.form.errors.pinataError
            : errorMessage.includes("network") || errorMessage.includes("Network")
            ? t.form.errors.networkErrorDescription
            : errorMessage,
          id: "profile-error",
        });
        setUploadProgress({ stage: "idle", progress: 0 });
        return;
      }

      // Écrire sur la blockchain
      setUploadProgress({ stage: "transaction", progress: 0 });
      writeContract({
        address: getContractAddress(),
        abi: THP_PROFILE_REGISTRY_ABI,
        functionName: "setProfile",
        args: [cid, isPublic],
      });
    } catch (error: any) {
      const errorMessage = error?.message || t.form.errors.unknown;
      toast.error(t.form.errors.saveError, {
        description: errorMessage,
      });
      setUploadProgress({ stage: "idle", progress: 0 });
    }
  };

  const isProcessing = uploadProgress.stage !== "idle" || isPending || isConfirming;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Barre de progression */}
        {isProcessing && (
          <div className="space-y-2 p-3 bg-secondary/20 border border-border/30 rounded-md">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {uploadProgress.stage === "avatar" && t.form.loading.avatarUpload}
                {uploadProgress.stage === "profile" && t.form.loading.profileUpload}
                {uploadProgress.stage === "transaction" && t.form.progress.transaction}
                {uploadProgress.stage === "complete" && t.common.save}
              </span>
              <span className="text-foreground font-mono">{uploadProgress.progress}%</span>
            </div>
            <Progress 
              value={uploadProgress.progress}
              aria-label={`Progression ${uploadProgress.progress} pourcent`}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName" className="text-xs text-muted-foreground mb-1 block">Prénom *</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              aria-required="true"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "firstName-error" : "firstName-help"}
              className={`h-7 text-xs ${errors.firstName ? "border-destructive" : ""}`}
              disabled={isProcessing}
            />
            {!errors.firstName && (
              <p id="firstName-help" className="text-xs text-muted-foreground mt-1">
                Votre prénom tel qu&apos;il apparaîtra dans l&apos;annuaire
              </p>
            )}
            {errors.firstName && (
              <p 
                id="firstName-error"
                role="alert" 
                aria-live="polite"
                className="text-xs text-destructive mt-1"
              >
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-xs text-muted-foreground mb-1 block">Nom *</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              aria-required="true"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "lastName-error" : "lastName-help"}
              className={`h-7 text-xs ${errors.lastName ? "border-destructive" : ""}`}
              disabled={isProcessing}
            />
            {!errors.lastName && (
              <p id="lastName-help" className="text-xs text-muted-foreground mt-1">
                Votre nom tel qu&apos;il apparaîtra dans l&apos;annuaire
              </p>
            )}
            {errors.lastName && (
              <p 
                id="lastName-error"
                role="alert" 
                aria-live="polite"
                className="text-xs text-destructive mt-1"
              >
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="age" className="text-xs text-muted-foreground mb-1 block">Âge</Label>
            <Input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="h-7 text-xs"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="department" className="text-xs text-muted-foreground mb-1 block">Département *</Label>
            <Input
              id="department"
              {...register("department")}
              aria-required="true"
              aria-invalid={errors.department ? "true" : "false"}
              aria-describedby={errors.department ? "department-error" : "department-help"}
              className={`h-7 text-xs ${errors.department ? "border-destructive" : ""}`}
              disabled={isProcessing}
            />
            {!errors.department && (
              <p id="department-help" className="text-xs text-muted-foreground mt-1">
                Exemple : Paris, Lyon, Marseille...
              </p>
            )}
            {errors.department && (
              <p 
                id="department-error"
                role="alert" 
                aria-live="polite"
                className="text-xs text-destructive mt-1"
              >
                {errors.department.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="bio" className="text-xs text-muted-foreground mb-1 block">Bio *</Label>
          <Textarea
            id="bio"
            {...register("bio")}
            rows={3}
            className={`text-xs min-h-[60px] ${errors.bio ? "border-destructive" : ""}`}
            disabled={isProcessing}
          />
          {errors.bio && (
            <p 
              role="alert" 
              aria-live="polite"
              className="text-xs text-destructive mt-1"
            >
              {errors.bio.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="linkedin" className="text-xs text-muted-foreground mb-1 block">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              {...register("linkedin")}
              placeholder="https://linkedin.com/in/..."
              className="h-7 text-xs"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="github" className="text-xs text-muted-foreground mb-1 block">GitHub</Label>
            <Input
              id="github"
              type="url"
              {...register("github")}
              placeholder="https://github.com/..."
              className="h-7 text-xs"
              disabled={isProcessing}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="discord" className="text-xs text-muted-foreground mb-1 block">Discord</Label>
          <Input
            id="discord"
            {...register("discord")}
            placeholder="@username"
            className="h-7 text-xs"
            disabled={isProcessing}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="availability" className="text-xs text-muted-foreground mb-1 block">Disponibilité</Label>
            <select
              id="availability"
              {...register("availability")}
              className="flex h-7 w-full rounded-md border border-input bg-card text-foreground px-2.5 py-1 text-xs"
              disabled={isProcessing}
            >
              <option value="available">Disponible</option>
              <option value="busy">Occupé</option>
              <option value="unavailable">Indisponible</option>
            </select>
          </div>

          <div>
            <Label htmlFor="isPublic" className="text-xs text-muted-foreground mb-1 block">Visibilité</Label>
            <select
              id="isPublic"
              aria-label="Visibilité du profil"
              value={isPublic ? "true" : "false"}
              onChange={(e) => setIsPublic(e.target.value === "true")}
              className="flex h-7 w-full rounded-md border border-input bg-card text-foreground px-2.5 py-1 text-xs"
              disabled={isProcessing}
            >
              <option value="true">Public</option>
              <option value="false">Privé</option>
            </select>
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1 block">Stack technique</Label>
          <div className="flex gap-1.5 mb-2">
            <Input
              id="stackTagInput"
              placeholder="Ajouter une technologie..."
              className="h-7 text-xs"
              disabled={isProcessing}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addStackTag();
                }
              }}
            />
            <Button type="button" onClick={addStackTag} size="sm" disabled={isProcessing}>
              Ajouter
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {stackTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-secondary/30 rounded text-xs flex items-center gap-1.5 border border-border/20"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeStackTag(tag)}
                  className="hover:text-destructive text-xs"
                  disabled={isProcessing}
                  aria-label={`Retirer ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="avatar" className="text-xs text-muted-foreground mb-1 block">Avatar</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="h-7 text-xs file:text-xs"
            disabled={isProcessing}
          />
          {avatarPreview && (
            <div className="mt-2 relative w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={avatarPreview}
                alt="Preview"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isProcessing} 
          size="sm"
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-3 w-3 mr-1.5 animate-spin" aria-hidden="true" />
              {uploadProgress.stage === "avatar" && t.form.loading.avatarUpload}
              {uploadProgress.stage === "profile" && t.form.loading.profileUpload}
              {uploadProgress.stage === "transaction" && t.form.progress.transactionShort}
              {uploadProgress.stage === "complete" && t.common.save}
              {(isPending || isConfirming) && t.form.loading.transactionPending}
            </>
          ) : (
            <>
              <Upload className="h-3 w-3 mr-1.5" aria-hidden="true" />
              Enregistrer
            </>
          )}
        </Button>
      </form>

      <ConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirmSubmit}
        estimatedGas={estimatedGas}
        gasPrice={gasPrice}
        isEstimating={isEstimatingGas}
        isPending={isPending || isConfirming}
      />
    </>
  );
}
