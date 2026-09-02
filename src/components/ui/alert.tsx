import type { FC, HTMLAttributes, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertType = "info" | "success" | "warning" | "error" | "important";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
  children: ReactNode;
}

export const Alert: FC<AlertProps> = ({
  type = "info",
  title,
  className,
  children,
  ...props
}) => {
  const configs = {
    info: {
      bg: "bg-emerald-50 border-emerald-200 text-[#187B28]",
      icon: <Info className="w-5 h-5 text-[#187B28] shrink-0" />,
    },
    success: {
      bg: "bg-emerald-50 border-emerald-300 text-[#187B28]",
      icon: <CheckCircle2 className="w-5 h-5 text-[#187B28] shrink-0" />,
    },
    warning: {
      bg: "bg-amber-50 border-amber-300 text-amber-900",
      icon: <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />,
    },
    error: {
      bg: "bg-red-50 border-red-200 text-[#DC0B10]",
      icon: <AlertCircle className="w-5 h-5 text-[#DC0B10] shrink-0" />,
    },
    important: {
      bg: "bg-slate-900 border-slate-800 text-white",
      icon: <ShieldAlert className="w-5 h-5 text-[#F9C511] shrink-0" />,
    },
  };

  const current = configs[type];

  return (
    <div
      className={cn(
        "p-4 border rounded-md flex items-start gap-3 text-xs leading-relaxed",
        current.bg,
        className
      )}
      role="alert"
      {...props}
    >
      {current.icon}
      <div className="space-y-1 flex-1">
        {title && <h4 className="font-bold text-sm leading-tight">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
};
