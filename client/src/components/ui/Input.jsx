export const Input = ({
  icon: Icon = null,
  label = "",
  error = "",
  hint = "",
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-tiny font-semibold text-slate-700 dark:text-slate-300 block ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 
            ${Icon ? "pl-12" : ""}
            bg-slate-50 dark:bg-slate-900
            border-2 border-transparent
            rounded-xl
            text-body dark:text-white
            placeholder-slate-400 dark:placeholder-slate-500
            outline-none
            transition-all duration-300
            focus:bg-white dark:focus:bg-slate-800
            focus:border-blue-500/50
            focus:ring-4 focus:ring-blue-500/10
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-rose-500/50 focus:border-rose-500/50" : ""}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{error}</p>}
      {hint && !error && <p className="text-tiny text-slate-500 dark:text-slate-400 ml-1">{hint}</p>}
    </div>
  );
};

export const Select = ({
  label = "",
  error = "",
  options = [],
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-tiny font-semibold text-slate-700 dark:text-slate-300 block ml-1">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3
          bg-slate-50 dark:bg-slate-900
          border-2 border-transparent
          rounded-xl
          text-body dark:text-white
          outline-none
          transition-all duration-300
          focus:bg-white dark:focus:bg-slate-800
          focus:border-blue-500/50
          focus:ring-4 focus:ring-blue-500/10
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-rose-500/50 focus:border-rose-500/50" : ""}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{error}</p>}
    </div>
  );
};

export const TextArea = ({
  label = "",
  error = "",
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-tiny font-semibold text-slate-700 dark:text-slate-300 block ml-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3
          bg-slate-50 dark:bg-slate-900
          border-2 border-transparent
          rounded-xl
          text-body dark:text-white
          placeholder-slate-400 dark:placeholder-slate-500
          outline-none
          transition-all duration-300
          focus:bg-white dark:focus:bg-slate-800
          focus:border-blue-500/50
          focus:ring-4 focus:ring-blue-500/10
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${error ? "border-rose-500/50 focus:border-rose-500/50" : ""}
        `}
        {...props}
      />
      {error && <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
