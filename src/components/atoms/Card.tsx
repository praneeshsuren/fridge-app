import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ 
  className = "", 
  children, 
  ...props 
}: CardProps) {
  const combinedClassName = `bg-white rounded-lg shadow-sm ${className}`;
  return (
    <div
      className={combinedClassName}
      {...props}
    >
      {children}
    </div>
  );
}
