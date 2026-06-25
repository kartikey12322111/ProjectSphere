export const Card = ({
  children,
  className = "",
  hoverable = false,
  gradient = false,
  border = true,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-2xl p-6 
        bg-white dark:bg-slate-900 
        ${border ? "border border-slate-200 dark:border-slate-800" : ""}
        ${hoverable ? "hover:shadow-xl hover:scale-[1.02] cursor-pointer" : "shadow-sm"}
        ${gradient ? "bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800" : ""}
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 pb-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`heading-md text-slate-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-tiny text-slate-600 dark:text-slate-400 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-3 ${className}`}>
    {children}
  </div>
);

export default Card;
