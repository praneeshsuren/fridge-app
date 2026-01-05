import Badge from "../atoms/Badge";

type StatusType = "Healthy" | "Expiring Soon" | "Expired";

interface StatusBadgeProps {
  status: StatusType;
}

const statusVariantMap: Record<StatusType, "success" | "warning" | "danger"> = {
  "Healthy": "success",
  "Expiring Soon": "warning",
  "Expired": "danger",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={statusVariantMap[status]}>{status}</Badge>;
}
