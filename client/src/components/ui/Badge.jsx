export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center gap-1 font-semibold rounded-full transition-all";

  const variants = {
    default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
    primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    danger: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    info: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    pending: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    approved: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    rejected: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-tiny",
    md: "px-3 py-1.5 text-tiny",
    lg: "px-4 py-2 text-body",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, className = "" }) => {
  const statusConfig = {
    pending: { variant: "pending", label: "Pending" },
    approved: { variant: "approved", label: "Approved" },
    rejected: { variant: "rejected", label: "Rejected" },
    completed: { variant: "completed", label: "Completed" },
    inProgress: { variant: "info", label: "In Progress" },
    submitted: { variant: "info", label: "Submitted" },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
};

export default Badge;
