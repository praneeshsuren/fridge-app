import { useState } from "react";
import type { FridgeItem } from "../types/fridge";

function getStatus(date: string) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();

  const expiry = new Date(date);

  const diffDays = Math.round((expiry.getTime() - today.getTime()) / MS_PER_DAY);

  if (diffDays < 0) return "Expired";
  if (diffDays <= 30) return "Expiring Soon";
  return "Healthy";
}

export default function FridgeRow({ 
    item, 
    onDelete, 
    onEdit 
}: { 
    item: FridgeItem; 
    onDelete?: (item: FridgeItem) => void; 
    onEdit?: (item: FridgeItem) => void 
}) {
    
  const [confirmOpen, setConfirmOpen] = useState(false);
  const status = getStatus(item.expiry);

  const badgeStyles = {
    "Healthy": "bg-green-100 text-green-700",
    "Expiring Soon": "bg-yellow-100 text-yellow-700",
    "Expired": "bg-red-100 text-red-700",
  }[status];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
      <div className="flex gap-12 cursor-pointer" onClick={() => onEdit?.(item)}>
        <p className="font-medium text-slate-800">{item.title}</p>
        <p className="text-xs text-slate-400 items-center">
          Expiry date — {item.expiry}
        </p>
      </div>

      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyles}`}>
        {status}
      </span>

      <div className="relative">
        <button
          aria-label="Delete item"
          onClick={() => setConfirmOpen(true)}
          className="ml-4 text-slate-400 hover:text-red-600 cursor-pointer"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m4 0H5" />
          </svg>
        </button>

        {confirmOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
            <div className="p-3 text-sm text-slate-700">Delete "{item.title}"?</div>
            <div className="flex justify-end gap-2 p-2 border-t">
              <button
                className="px-3 py-1 rounded bg-gray-100 text-sm hover:bg-gray-200"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                onClick={() => {
                  setConfirmOpen(false);
                  onDelete?.(item);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
