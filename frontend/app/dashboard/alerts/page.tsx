"use client";

import { useState } from "react";
import { XCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { alerts } from "./data";
import AlertCard from "./components/AlertCard";
import AlertRules from "./components/AlertRules";
import DarkModeToggle from "../../components/DarkModeToggle";

type Filter = "all" | "active" | "acknowledged" | "resolved";

const summary = {
  critical:     alerts.filter((a) => a.severity === "critical" && a.state !== "resolved").length,
  warning:      alerts.filter((a) => a.severity === "warning"  && a.state !== "resolved").length,
  acknowledged: alerts.filter((a) => a.state === "acknowledged").length,
  resolved:     alerts.filter((a) => a.state === "resolved").length,
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = alerts.filter((a) => filter === "all" || a.state === filter);

  const tabClass = (f: Filter) =>
    `px-4 py-2 text-sm font-medium rounded-xl transition-all ${
      filter === f
        ? "bg-blue-600 text-white"
        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alerts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor threshold breaches and system events
          </p>
        </div>
        <DarkModeToggle />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Critical",     value: summary.critical,     icon: XCircle,       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-500/10"      },
          { label: "Warnings",     value: summary.warning,      icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
          { label: "Acknowledged", value: summary.acknowledged, icon: Info,          color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-500/10"    },
          { label: "Resolved",     value: summary.resolved,     icon: CheckCircle,   color: "text-green-500",  bg: "bg-green-50 dark:bg-green-500/10"  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${bg}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-4">
        {/* Filter tabs */}
        <div className="flex items-center gap-2">
          <button type="button" className={tabClass("all")}          onClick={() => setFilter("all")}>          All ({alerts.length})</button>
          <button type="button" className={tabClass("active")}       onClick={() => setFilter("active")}>       Active ({alerts.filter(a => a.state === "active").length})</button>
          <button type="button" className={tabClass("acknowledged")} onClick={() => setFilter("acknowledged")}> Acknowledged ({summary.acknowledged})</button>
          <button type="button" className={tabClass("resolved")}     onClick={() => setFilter("resolved")}>     Resolved ({summary.resolved})</button>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-400 text-sm">
              No alerts in this category
            </div>
          ) : (
            filtered.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </div>
      </div>

      {/* Alert Rules */}
      <AlertRules />
    </div>
  );
}
