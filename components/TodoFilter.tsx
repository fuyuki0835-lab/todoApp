"use client";

import { Filter } from "./TodoApp";

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

export default function TodoFilter({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  totalCount,
}: Props) {
  const counts: Record<Filter, number> = {
    all: totalCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex-1 flex items-center justify-center gap-1 py-2 px-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
            filter === f.value
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {f.label}
          <span
            className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
              filter === f.value
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
