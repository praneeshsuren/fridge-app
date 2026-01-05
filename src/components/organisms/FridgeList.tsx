import type { FridgeItem } from "../../types/fridge";
import Text from "../atoms/Text";
import FridgeRow from "./FridgeRow";

interface FridgeListProps {
  items: FridgeItem[];
  loading?: boolean;
  error?: string | null;
  onDelete?: (item: FridgeItem) => void;
  onEdit?: (item: FridgeItem) => void;
}

export default function FridgeList({
  items,
  loading,
  error,
  onDelete,
  onEdit,
}: FridgeListProps) {
  return (
    <div className="mt-10">
      <Text variant="small" className="text-right mb-2 font-bold">
        Total items — {items.length.toString().padStart(2, "0")}
      </Text>

      {loading && (
        <div className="text-sm text-center text-blue-900 font-bold">
          <Text variant="body">...</Text>
          <Text variant="body" className="mt-2">
            Loading fridge items
          </Text>
        </div>
      )}

      {error && (
        <Text variant="small" className="text-red-600">
          {error}
        </Text>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <FridgeRow
            key={item._id ?? `${item.title}-${item.expiry}`}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
