import { HTMLAttributes } from "react";

type TextVariant = "h1" | "h2" | "body" | "small" | "caption";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "text-3xl font-bold",
  h2: "text-xl font-semibold",
  body: "text-base",
  small: "text-sm",
  caption: "text-xs text-slate-400",
};

export default function Text({ 
  variant = "body", 
  as: Component = "p", 
  className = "", 
  children, 
  ...props 
}: TextProps) {
  const combinedClassName = `${variantStyles[variant]} ${className}`;
  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
