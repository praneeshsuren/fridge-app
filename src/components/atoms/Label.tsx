import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label({ 
  className = "", 
  children, 
  ...props 
}: LabelProps) {
  return (
    <label
      className={`text-sm font-medium text-slate-600 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
