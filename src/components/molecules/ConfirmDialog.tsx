import Button from "../atoms/Button";
import Card from "../atoms/Card";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ 
  title, 
  message, 
  onConfirm, 
  onCancel 
}: ConfirmDialogProps) {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
      <div className="p-3 text-sm text-slate-700">
        <strong>{title}</strong>
        <p className="mt-1">{message}</p>
      </div>
      <div className="flex justify-end gap-2 p-2 border-t">
        <Button
          variant="secondary"
          className="px-3 py-1 text-sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="px-3 py-1 text-sm"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
