import type { SVGAttributes } from "react";

type IconType = "delete";

interface IconProps extends SVGAttributes<SVGSVGElement> {
  type: IconType;
  size?: number;
}

const icons: Record<IconType, React.ReactNode> = {
  delete: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m4 0H5"
    />
  ),
};

export default function Icon({ 
  type, 
  size = 20, 
  ...props 
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      {icons[type]}
    </svg>
  );
}
