import type { FC, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card: FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={cn(
      "bg-white border border-slate-200 rounded-md shadow-xs transition-shadow hover:shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("p-5 pb-3 space-y-1 border-b border-slate-100", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: FC<CardProps> = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg sm:text-xl font-bold text-[#187B28]", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription: FC<CardProps> = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-slate-600 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const CardContent: FC<CardProps> = ({ className, children, ...props }) => (
  <div className={cn("p-5 space-y-4 text-sm text-[#181818]", className)} {...props}>
    {children}
  </div>
);

export const CardFooter: FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={cn(
      "p-4 bg-slate-50 border-t border-slate-100 rounded-b-md flex items-center justify-between gap-4 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export interface EditorialCardProps extends CardProps {
  category?: string;
  date?: string;
  imageUrl?: string;
}

export const EditorialCard: FC<EditorialCardProps> = ({
  category,
  date,
  imageUrl,
  className,
  children,
  ...props
}) => (
  <Card className={cn("overflow-hidden flex flex-col h-full", className)} {...props}>
    {imageUrl && (
      <div className="w-full h-48 bg-slate-100 overflow-hidden border-b border-slate-200">
        <img src={imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
    )}
    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
      {(category || date) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {category && <span className="text-[#187B28]">{category}</span>}
          {date && <span>{date}</span>}
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  </Card>
);

export interface NoticeCardProps extends CardProps {
  type?: "info" | "warning" | "important";
}

export const NoticeCard: FC<NoticeCardProps> = ({
  type = "info",
  className,
  children,
  ...props
}) => {
  const styles = {
    info: "bg-emerald-50 border-emerald-200 text-[#187B28]",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    important: "bg-slate-900 border-slate-800 text-white",
  };

  return (
    <div
      className={cn("p-5 border rounded-md text-sm leading-relaxed space-y-2", styles[type], className)}
      {...props}
    >
      {children}
    </div>
  );
};
