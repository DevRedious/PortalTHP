"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  estimatedGas?: bigint;
  gasPrice?: bigint;
  isEstimating: boolean;
  isPending: boolean;
}

export function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  estimatedGas,
  gasPrice,
  isEstimating,
  isPending,
}: ConfirmationModalProps) {
  const { t } = useI18n();
  const estimatedCost = estimatedGas && gasPrice 
    ? (estimatedGas * gasPrice) / BigInt(10 ** 18)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-sm font-normal text-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" aria-hidden="true" />
            {t.modal.confirmSave.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {t.modal.confirmSave.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="text-xs text-muted-foreground space-y-1.5">
            <p>{t.modal.confirmSave.youWill}</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>{t.modal.confirmSave.uploadIPFS}</li>
              <li>{t.modal.confirmSave.saveURI}</li>
              <li>{t.modal.confirmSave.payGas}</li>
            </ul>
          </div>

          {isEstimating ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
              <span>{t.modal.confirmSave.estimating}</span>
            </div>
          ) : estimatedGas && estimatedCost ? (
            <div className="bg-secondary/30 border border-border/30 rounded-md p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.modal.confirmSave.estimatedGas}</span>
                <span className="text-foreground font-mono">
                  {estimatedGas.toString()} units
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.modal.confirmSave.estimatedCost}</span>
                <span className="text-foreground font-mono">
                  ~{estimatedCost.toString()} ETH
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground py-2">
              {t.modal.confirmSave.estimationUnavailable}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            size="sm"
            className="text-xs"
          >
            {t.common.cancel}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isPending || isEstimating}
            size="sm"
            className="text-xs"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3 w-3 mr-1.5 animate-spin" aria-hidden="true" />
                {t.modal.confirmSave.confirming}
              </>
            ) : (
              t.modal.confirmSave.confirm
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
