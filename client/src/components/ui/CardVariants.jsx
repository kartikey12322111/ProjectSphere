import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  description = "",
  icon: Icon = null,
  variant = "primary",
  trend = null,
  className = "",
}) => {
  const variants = {
    primary: "from-blue-600 to-indigo-600",
    success: "from-emerald-600 to-teal-600",
    danger: "from-rose-600 to-red-600",
    warning: "from-amber-600 to-orange-600",
    purple: "from-violet-600 to-fuchsia-600",
  };

  return (
    <div className={`
      rounded-2xl p-6 
      bg-gradient-to-br ${variants[variant]}
      text-white
      shadow-lg
      hover:shadow-xl
      transition-all duration-300
      hover:scale-[1.02]
      ${className}
    `}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-tiny opacity-90 mb-2">{title}</p>
          <div className="flex items-end gap-3">
            <p className="heading-lg">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 text-tiny ${trend > 0 ? "text-emerald-200" : "text-rose-200"}`}>
                {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
          {description && <p className="text-tiny opacity-75 mt-2">{description}</p>}
        </div>
        {Icon && (
          <div className="p-3 bg-white/20 rounded-xl">
            <Icon size={24} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectCard = ({
  title,
  description,
  status = "pending",
  progress = 0,
  supervisor = "",
  deadline = "",
  students = [],
  onClick = () => {},
  className = "",
}) => {
  const statusColors = {
    pending: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    inProgress: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    approved: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-6
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        hover:shadow-xl hover:scale-[1.02]
        transition-all duration-300
        cursor-pointer
        space-y-4
        ${className}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="heading-md text-slate-900 dark:text-white line-clamp-2">{title}</h3>
          <p className="text-tiny text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{description}</p>
        </div>
        <span className={`text-tiny font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {progress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-tiny font-semibold text-slate-600 dark:text-slate-400">Progress</span>
            <span className="text-tiny font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
        {supervisor && (
          <div className="flex justify-between items-center text-tiny">
            <span className="text-slate-600 dark:text-slate-400">Supervisor</span>
            <span className="font-semibold text-slate-900 dark:text-white">{supervisor}</span>
          </div>
        )}
        {deadline && (
          <div className="flex justify-between items-center text-tiny">
            <span className="text-slate-600 dark:text-slate-400">Deadline</span>
            <span className="font-semibold text-slate-900 dark:text-white">{deadline}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const UserCard = ({
  name,
  email,
  role,
  avatar = "",
  department = "",
  onClick = () => {},
  className = "",
}) => {
  const roleColors = {
    Student: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    Teacher: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    Admin: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl p-5
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        hover:shadow-lg hover:scale-[1.02]
        transition-all duration-300
        cursor-pointer
        space-y-3
        text-center
        ${className}
      `}
    >
      {avatar && (
        <img src={avatar} alt={name} className="w-16 h-16 rounded-full mx-auto object-cover" />
      )}
      <div>
        <h3 className="heading-sm text-slate-900 dark:text-white">{name}</h3>
        <p className="text-tiny text-slate-600 dark:text-slate-400">{email}</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <span className={`text-tiny font-semibold px-3 py-1 rounded-full ${roleColors[role] || roleColors.Student}`}>
          {role}
        </span>
        {department && (
          <span className="text-tiny font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {department}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
