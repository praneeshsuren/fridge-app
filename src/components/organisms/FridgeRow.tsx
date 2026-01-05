import type { FridgeItem } from "../../types/fridge";
import Card from "../atoms/Card";
import Text from "../atoms/Text";
import StatusBadge from "../molecules/StatusBadge";
import DeleteButton from "../molecules/DeleteButton";
import { formatDate } from "../../utils/dateFormat";

type StatusType = "Healthy" | "Expiring Soon" | "Expired";

function getStatus(date: string): StatusType {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  const expiry = new Date(date);
  const diffDays = Math.round((expiry.getTime() - today.getTime()) / MS_PER_DAY);

  if (diffDays < 0) return "Expired";
  if (diffDays <= 30) return "Expiring Soon";
  return "Healthy";
}

interface FridgeRowProps {
  item: FridgeItem;
  onDelete?: (item: FridgeItem) => void;
  onEdit?: (item: FridgeItem) => void;
}

export default function FridgeRow({ item, onDelete, onEdit }: FridgeRowProps) {
  const status = getStatus(item.expiry);

  return (
    <Card className="p-4 flex justify-between items-center">
      <div
        className="flex items-center cursor-pointer flex-1"
        onClick={() => onEdit?.(item)}
      >
        <Text variant="body" className="font-medium text-slate-800 w-64 flex-shrink-0">
          {item.title}
        </Text>
        <Text variant="caption" className="items-center whitespace-nowrap ml-8">
          Expiry date — {formatDate(item.expiry)}
        </Text>
      </div>

      <StatusBadge status={status} />

      <DeleteButton
        itemTitle={item.title}
        onDelete={() => onDelete?.(item)}
      />
    </Card>
  );
}
