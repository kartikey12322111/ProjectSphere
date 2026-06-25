import { Breadcrumbs } from "../../components/common/Breadcrumbs";

export const PageHeader = ({
  title,
  subtitle = "",
  icon: Icon = null,
  badge = "",
  actions = [],
  className = "",
}) => {
  return (
    <div className={`
      rounded-2xl p-8 mb-8
      bg-gradient-to-br from-blue-50 to-indigo-50
      dark:from-slate-900 dark:to-blue-900/20
      border border-blue-100 dark:border-blue-900/30
      shadow-lg shadow-blue-500/10
      ${className}
    `}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
              <Icon size={28} />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="heading-lg text-slate-900 dark:text-white">{title}</h1>
              {badge && (
                <span className="px-3 py-1 bg-blue-600 text-white text-tiny font-semibold rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-body text-slate-600 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        {actions && actions.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  font-semibold transition-all active:scale-95
                  ${action.variant === "primary"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }
                `}
              >
                {action.icon && <action.icon size={18} />}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const PageContainer = ({ children, className = "" }) => (
  <div className={`max-w-[1600px] mx-auto space-y-8 pb-12 ${className}`}>
    {children}
  </div>
);

export const PageSection = ({
  title = "",
  description = "",
  children,
  className = "",
}) => (
  <div className={`rounded-2xl p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {(title || description) && (
      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        {title && <h2 className="heading-md text-slate-900 dark:text-white">{title}</h2>}
        {description && <p className="text-body text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
      </div>
    )}
    {children}
  </div>
);

export default PageHeader;
