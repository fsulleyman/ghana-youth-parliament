import type { FC, HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Table: FC<TableHTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <div className="w-full overflow-x-auto border border-slate-200 rounded-md bg-white">
    <table className={cn("w-full text-left text-xs text-[#181818]", className)} {...props} />
  </div>
);

export const TableHeader: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <thead className={cn("bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold text-[11px]", className)} {...props} />
);

export const TableBody: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <tbody className={cn("divide-y divide-slate-100", className)} {...props} />
);

export const TableRow: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => (
  <tr className={cn("hover:bg-slate-50/80 transition-colors", className)} {...props} />
);

export const TableHead: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <th className={cn("px-4 py-3 font-bold text-slate-700 border-b border-slate-200", className)} {...props} />
);

export const TableCell: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <td className={cn("px-4 py-3 align-middle text-slate-800", className)} {...props} />
);

export const TableCaption: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <caption className={cn("py-2 text-xs text-slate-500 italic", className)} {...props} />
);

export const TableEmpty: FC<{ children?: ReactNode; colSpan: number }> = ({
  children = "No records found matching your query.",
  colSpan,
}) => (
  <tr>
    <td colSpan={colSpan} className="px-4 py-8 text-center text-xs text-slate-500">
      {children}
    </td>
  </tr>
);
