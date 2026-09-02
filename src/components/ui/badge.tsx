import type { FC, HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded border transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-emerald-50 text-[#187B28] border-emerald-200",
        accent: "bg-[#FFFDF0] text-[#856404] border-[#F9C511]",
        warning: "bg-amber-50 text-amber-900 border-amber-200",
        error: "bg-red-50 text-[#DC0B10] border-red-200",
        neutral: "bg-slate-100 text-slate-700 border-slate-300",
        outline: "bg-transparent text-[#181818] border-slate-300",
        dark: "bg-slate-900 text-white border-slate-800",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  className,
  variant,
  icon,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
