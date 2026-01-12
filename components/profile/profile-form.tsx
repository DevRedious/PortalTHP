"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type Profile } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import { uploadProfile, uploadAvatar } from "@/lib/ipfs";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { THP_PROFILE_REGISTRY_ABI, getContractAddress } from "@/lib/contract";

export function ProfileForm({ initialData }: { initialData?: Profile }) {
  const { address } = useAccount();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  
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

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    if (!address) return;

    try {
      let avatarCID = data.avatarCID;

      // Upload avatar si nouveau
      if (avatarFile) {
        avatarCID = await uploadAvatar(avatarFile);
      }

      // Préparer le profil pour IPFS
      const profileIPFS = {
        ...data,
        avatarCID,
        version: "1.0" as const,
        updatedAt: new Date().toISOString(),
      };

      // Upload du profil sur IPFS
      const cid = await uploadProfile(profileIPFS);

      // Écrire sur la blockchain
      writeContract({
        address: getContractAddress(),
        abi: THP_PROFILE_REGISTRY_ABI,
        functionName: "setProfile",
        args: [cid, isPublic],
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="firstName" className="text-xs text-muted-foreground mb-1 block">Prénom *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={`h-7 text-xs ${errors.firstName ? "border-destructive" : ""}`}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName" className="text-xs text-muted-foreground mb-1 block">Nom *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={`h-7 text-xs ${errors.lastName ? "border-destructive" : ""}`}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">
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
          />
        </div>

        <div>
          <Label htmlFor="department" className="text-xs text-muted-foreground mb-1 block">Département *</Label>
          <Input
            id="department"
            {...register("department")}
            className={`h-7 text-xs ${errors.department ? "border-destructive" : ""}`}
          />
          {errors.department && (
            <p className="text-xs text-destructive mt-1">
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
        />
        {errors.bio && (
          <p className="text-xs text-destructive mt-1">
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
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="availability" className="text-xs text-muted-foreground mb-1 block">Disponibilité</Label>
          <select
            id="availability"
            {...register("availability")}
            className="flex h-7 w-full rounded-md border border-input bg-card text-foreground px-2.5 py-1 text-xs"
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addStackTag();
              }
            }}
          />
          <Button type="button" onClick={addStackTag} size="sm">
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

      <Button type="submit" disabled={isPending || isConfirming} size="sm">
        {isPending || isConfirming
          ? "Enregistrement..."
          : "Enregistrer"}
      </Button>
    </form>
  );
}
