import type { FridgeItem } from "../types/fridge";
import FridgeRow from "./FridgeRow";

export default function FridgeList({ items, loading, error, onDelete, onEdit }: { items: FridgeItem[]; loading?: boolean; error?: string | null; onDelete?: (item: FridgeItem) => void; onEdit?: (item: FridgeItem) => void }) {
  return (
    <div className="mt-10">
      <div className="text-right text-sm mb-2 font-bold tex">
        Total items — {items.length.toString().padStart(2, "0")}
      </div>

      {loading && <div className="text-sm text-center text-blue-900 font-bold"><p>...</p><p className="mt-2">Loading fridge items</p></div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="space-y-3">
        {items.map((item) => (
          <FridgeRow key={item._id ?? `${item.title}-${item.expiry}`} item={item} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
