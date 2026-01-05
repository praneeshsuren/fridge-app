import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function Input({ 
  fullWidth = false, 
  className = "", 
  ...props 
}: InputProps) {
  return (
    <input
      className={`rounded-sm border px-3 py-2 ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
}
