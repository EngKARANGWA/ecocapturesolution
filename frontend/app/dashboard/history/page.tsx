import HistoryChart from "./components/HistoryChart";
import HistoryTable from "./components/HistoryTable";
import DarkModeToggle from "../../components/DarkModeToggle";
import { readings } from "./data";

const avgInput     = Math.round(readings.reduce((s, r) => s + r.coInput,  0) / readings.length);
const avgOutput    = Math.round(readings.reduce((s, r) => s + r.coOutput, 0) / readings.length);
const avgReduction = (readings.reduce((s, r) => s + r.reduction, 0) / readings.length).toFixed(1);
const criticalCount = readings.filter((r) => r.status === "critical").length;

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">History</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Historical CO readings across all active devices
          </p>
        </div>
        <DarkModeToggle />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Avg CO Input",     value: `${avgInput} ppm`,    color: "text-red-500"   },
          { label: "Avg After Purif.", value: `${avgOutput} ppm`,   color: "text-green-500" },
          { label: "Avg Reduction",    value: `${avgReduction}%`,   color: "text-blue-500"  },
          { label: "Critical Events",  value: String(criticalCount), color: "text-red-500"  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm text-center">
            <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <HistoryChart />

      {/* Table */}
      <HistoryTable />
    </div>
  );
}
