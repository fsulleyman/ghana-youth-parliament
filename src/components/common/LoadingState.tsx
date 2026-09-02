import type { FC } from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export const LoadingState: FC<LoadingStateProps> = ({
  message = "Loading official content...",
  fullPage = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <Loader2 className="w-8 h-8 text-[#0E2A47] animate-spin" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return content;
};
