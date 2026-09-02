import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const H1: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h1
    className={cn(
      "text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#187B28] tracking-tight leading-tight",
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H2: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h2
    className={cn(
      "text-2xl sm:text-3xl font-bold text-[#187B28] tracking-tight leading-snug border-b border-slate-200 pb-2",
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

export const H3: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h3
    className={cn(
      "text-xl sm:text-2xl font-bold text-[#181818] tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

export const H4: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h4
    className={cn(
      "text-lg font-semibold text-[#181818] tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h4>
);

export const Lead: FC<HeadingProps> = ({ className, children, ...props }) => (
  <p
    className={cn("text-base sm:text-lg text-slate-600 leading-relaxed", className)}
    {...props}
  >
    {children}
  </p>
);

export const Text: FC<HeadingProps> = ({ className, children, ...props }) => (
  <p className={cn("text-sm sm:text-base text-[#181818] leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const Muted: FC<HeadingProps> = ({ className, children, ...props }) => (
  <p className={cn("text-xs sm:text-sm text-slate-500 leading-normal", className)} {...props}>
    {children}
  </p>
);
