interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  accent: "blue" | "green" | "red" | "purple" | "yellow";
}

const accentMap = {
  blue:   "text-blue-500",
  green:  "text-green-500",
  red:    "text-red-500",
  purple: "text-purple-500",
  yellow: "text-yellow-500",
};

export default function MetricCard({ title, value, unit, accent }: MetricCardProps) {
  const text = accentMap[accent];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm text-center">
      <p className={`text-3xl font-extrabold ${text}`}>{value}{unit && <span className="text-base font-normal text-slate-400 ml-1">{unit}</span>}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{title}</p>
    </div>
  );
}
