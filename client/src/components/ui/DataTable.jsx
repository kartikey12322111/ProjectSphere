import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

export const DataTable = ({
  columns,
  data,
  striped = true,
  hoverable = true,
  onRowClick = null,
  loading = false,
  paginated = true,
  pageSize = 10,
  searchable = true,
  searchKeys = [],
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  // Filter data
  const filteredData = searchable && searchTerm
    ? data.filter((item) =>
        searchKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Sort data
  let sortedData = [...filteredData];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }

  // Paginate
  const totalPages = paginated ? Math.ceil(sortedData.length / pageSize) : 1;
  const startIdx = paginated ? currentPage * pageSize : 0;
  const endIdx = paginated ? startIdx + pageSize : sortedData.length;
  const displayData = sortedData.slice(startIdx, endIdx);

  const handleSort = (key) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const SortIcon = ({ dataKey }) => {
    if (sortConfig?.key !== dataKey)
      return <ChevronUp size={16} className="opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search table..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-3 text-left text-tiny font-semibold text-slate-700 dark:text-slate-300 ${
                    col.sortable ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{col.label}</span>
                    {col.sortable && <SortIcon dataKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-slate-200 dark:border-slate-700 
                  ${striped && idx % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/30" : ""}
                  ${hoverable ? "hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer" : ""}
                  transition-colors
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-body dark:text-slate-300"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayData.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No data found</p>
        </div>
      )}

      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-tiny text-slate-600 dark:text-slate-400">
            Showing {startIdx + 1} to {Math.min(endIdx, sortedData.length)} of{" "}
            {sortedData.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-10 h-10 rounded-lg border transition-all ${
                  i === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
