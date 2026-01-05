import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function FormField({ 
  label, 
  type = "text", 
  value, 
  onChange,
  className = "" 
}: FormFieldProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <Label className="mb-1">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
    </div>
  );
}
