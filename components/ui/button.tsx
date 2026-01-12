import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-muted-foreground/90 active:scale-[0.98]",
        destructive:
          "bg-destructive/90 text-destructive-foreground hover:bg-destructive active:scale-[0.98]",
        outline:
          "border border-border/80 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-border text-foreground active:scale-[0.98]",
        secondary:
          "bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 border border-border/30 active:scale-[0.98]",
        ghost: "hover:bg-accent/30 text-foreground active:scale-[0.98]",
        link: "text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-7 px-3 py-1.5 text-xs",
        sm: "h-6 px-2.5 py-1 text-xs",
        lg: "h-8 px-4 py-2 text-xs",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
