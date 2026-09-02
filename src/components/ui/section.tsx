import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/navigation";

export interface PageHeaderBannerProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const PageHeaderBanner: FC<PageHeaderBannerProps> = ({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  className,
}) => (
  <div className={cn("bg-[#187B28] text-white py-10 border-b-4 border-[#F9C511]", className)}>
    <div className="container-custom space-y-4">
      {breadcrumbs && (
        <div className="text-white/80">
          <Breadcrumbs items={breadcrumbs} className="text-emerald-100" />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          {badge && <div>{badge}</div>}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  </div>
);

export interface SectionTitleBlockProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export const SectionTitleBlock: FC<SectionTitleBlockProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => (
  <div className={cn("border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3", className)}>
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#187B28] tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
);

export interface EditorialSplitProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
}

export const EditorialSplit: FC<EditorialSplitProps> = ({
  leftContent,
  rightContent,
  className,
}) => (
  <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-8", className)}>
    <div className="lg:col-span-2 space-y-6">{leftContent}</div>
    <div className="space-y-6">{rightContent}</div>
  </div>
);
