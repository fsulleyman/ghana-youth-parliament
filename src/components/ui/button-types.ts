import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187B28] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded text-xs tracking-wider uppercase cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#187B28] text-white hover:bg-[#136320] active:bg-[#0E4918] shadow-sm",
        accent:
          "bg-[#F9C511] text-[#181818] hover:bg-[#E0B00F] active:bg-[#C89B0B] font-bold shadow-sm",
        secondary:
          "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900",
        outline:
          "border border-slate-300 bg-white text-[#181818] hover:bg-slate-100 hover:border-slate-400",
        ghost:
          "text-[#181818] hover:bg-slate-100 hover:text-[#187B28]",
        danger:
          "bg-[#DC0B10] text-white hover:bg-[#B5090D] active:bg-[#8F070A]",
        link:
          "text-[#187B28] underline-offset-4 hover:underline p-0 h-auto font-normal lowercase tracking-normal normal-case",
      },
      size: {
        sm: "h-8 px-3 text-[11px]",
        md: "h-10 px-4 text-xs",
        lg: "h-12 px-6 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
