import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full h-10 px-3 py-2 text-sm bg-white border border-slate-300 rounded text-[#181818] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#187B28] focus:border-[#187B28] disabled:bg-slate-100 disabled:opacity-60 transition-colors",
          error && "border-[#DC0B10] focus:ring-[#DC0B10] focus:border-[#DC0B10]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="search"
          ref={ref}
          className={cn(
            "w-full h-10 pl-9 pr-4 text-sm bg-white border border-slate-300 rounded text-[#181818] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#187B28] focus:border-[#187B28] transition-colors",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded text-[#181818] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#187B28] focus:border-[#187B28] disabled:bg-slate-100 disabled:opacity-60 transition-colors",
          error && "border-[#DC0B10] focus:ring-[#DC0B10] focus:border-[#DC0B10]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full h-10 px-3 py-2 text-sm bg-white border border-slate-300 rounded text-[#181818] focus:outline-none focus:ring-2 focus:ring-[#187B28] focus:border-[#187B28] disabled:bg-slate-100 disabled:opacity-60 transition-colors cursor-pointer",
          error && "border-[#DC0B10] focus:ring-[#DC0B10] focus:border-[#DC0B10]",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, required, children, className }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={cn("block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5", className)}
  >
    {children}
    {required && <span className="text-[#DC0B10] ml-1">*</span>}
  </label>
);

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
  className,
}: FormFieldProps) => (
  <div className={cn("space-y-1.5", className)}>
    {label && (
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
    )}
    {children}
    {error ? (
      <p className="text-xs text-[#DC0B10] font-medium">{error}</p>
    ) : helperText ? (
      <p className="text-xs text-slate-500">{helperText}</p>
    ) : null}
  </div>
);
