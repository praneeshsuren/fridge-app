import { useState } from "react";
import Icon from "../atoms/Icon";
import ConfirmDialog from "./ConfirmDialog";

interface DeleteButtonProps {
  itemTitle: string;
  onDelete: () => void;
}

export default function DeleteButton({ itemTitle, onDelete }: DeleteButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="Delete item"
        onClick={() => setConfirmOpen(true)}
        className="ml-4 text-slate-400 hover:text-red-600 cursor-pointer"
        title="Delete"
      >
        <Icon type="delete" size={20} />
      </button>

      {confirmOpen && (
        <ConfirmDialog
          title="Confirm Delete"
          message={`Delete "${itemTitle}"?`}
          onConfirm={() => {
            setConfirmOpen(false);
            onDelete();
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}
