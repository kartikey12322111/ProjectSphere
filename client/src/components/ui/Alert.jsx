import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export const Alert = ({
  variant = "info",
  title = "",
  message,
  closeable = true,
  onClose = () => {},
  className = "",
}) => {
  const variants = {
    info: {
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      border: "border-cyan-200 dark:border-cyan-800",
      icon: Info,
      color: "text-cyan-600 dark:text-cyan-400",
    },
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
    },
    error: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-rose-200 dark:border-rose-800",
      icon: AlertCircle,
      color: "text-rose-600 dark:text-rose-400",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={`
        rounded-xl p-4
        border
        flex gap-3
        ${config.bg}
        ${config.border}
        ${className}
      `}
    >
      <Icon size={20} className={`${config.color} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {title && <p className="font-semibold text-slate-900 dark:text-white">{title}</p>}
        <p className={`text-tiny ${title ? "mt-1" : ""} text-slate-700 dark:text-slate-300`}>{message}</p>
      </div>
      {closeable && (
        <button
          onClick={onClose}
          className={`${config.color} hover:opacity-70 transition-opacity flex-shrink-0 ml-2`}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
