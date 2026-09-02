import { useEffect, type FC, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={cn(
          "w-full bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden space-y-0",
          widthClasses[maxWidth]
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Dialog Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
          <div className="space-y-1">
            {title && <h3 className="text-base font-bold text-[#187B28]">{title}</h3>}
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dialog Body */}
        <div className="p-4 sm:p-6 text-xs text-[#181818] space-y-4 max-h-[75vh] overflow-y-auto">
          {children}
        </div>

        {/* Dialog Footer */}
        {footer && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
