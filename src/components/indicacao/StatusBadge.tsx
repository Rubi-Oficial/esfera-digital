import { STATUS_CONFIG } from "./data";

const StatusBadge = ({ status }: { status: string }) => {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${c.color}`}>{c.label}</span>;
};

export default StatusBadge;
