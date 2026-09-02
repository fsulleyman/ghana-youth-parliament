import type { FC } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items, className }) => (
  <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-slate-500 py-2", className)}>
    <ol className="flex items-center gap-1.5 flex-wrap">
      <li>
        <Link to="/" className="hover:text-[#187B28] transition-colors font-medium">
          Home
        </Link>
      </li>
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link to={item.href} className="hover:text-[#187B28] transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-900 truncate max-w-[200px]" aria-current="page">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => (
  <div className={cn("border-b border-slate-200 w-full overflow-x-auto", className)}>
    <div className="flex items-center space-x-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer",
              isActive
                ? "border-[#187B28] text-[#187B28] bg-emerald-50/50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold",
                  isActive ? "bg-[#187B28] text-white" : "bg-slate-100 text-slate-600"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationControls: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between py-4 border-t border-slate-200 text-xs text-slate-600", className)}>
      <div>
        Showing page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
