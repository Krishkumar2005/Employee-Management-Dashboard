import { useMemo, useState } from "react";
import { Users, UserCheck, DollarSign, TrendingUp } from "lucide-react";
import employeeData from "../data/employees.json";
import { computeStats, formatSalary } from "../utils/analytics";
import StatCard from "../components/StatCard";
import { DeptChart, PerfChart, SalaryChart } from "../components/Charts";
import EmployeeTable from "../components/EmployeeTable";
import Navbar from "../components/Navbar";
import { useTheme } from "../hooks/useTheme";

export default function Dashboard() {
  const { isDark, toggle } = useTheme();
  const [search, setSearch] = useState("");

  const employees = employeeData.employees;
  const stats = useMemo(() => computeStats(employees), [employees]);

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${isDark ? "bg-slate-950 text-slate-200" : "bg-slate-50 text-slate-700"}`}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px]
          ${isDark ? "bg-indigo-600/5" : "bg-indigo-200/40"}`} />
        <div className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px]
          ${isDark ? "bg-violet-600/4" : "bg-violet-200/30"}`} />
      </div>

      <Navbar isDark={isDark} onToggleTheme={toggle} search={search} onSearch={setSearch} />

      <main className="relative w-full px-8 py-8">

        {/* Page header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className={`font-display text-2xl font-bold tracking-tight
              ${isDark ? "text-white" : "text-slate-900"}`}>
              People Analytics
            </h1>
            <p className={`text-sm mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              Real-time workforce intelligence · {stats.total} employees · 5 departments
            </p>
          </div>
          <div className={`text-xs font-mono px-3 py-1.5 rounded-lg border
            ${isDark ? "text-slate-500 border-slate-800 bg-slate-900/60" : "text-slate-400 border-slate-200 bg-white"}`}>
            May 2026
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard icon={Users} label="Total Employees" value={stats.total}
            sub="All departments" accent="indigo" isDark={isDark} delay={0} />
          <StatCard icon={UserCheck} label="Active Employees" value={stats.active}
            sub={`${Math.round((stats.active / stats.total) * 100)}% of workforce`}
            accent="emerald" isDark={isDark} delay={80} />
          <StatCard icon={DollarSign} label="Avg Salary" value={formatSalary(stats.avgSalary)}
            sub="Across all roles" accent="amber" isDark={isDark} delay={160} />
          <StatCard icon={TrendingUp} label="Top Department" value={stats.topDept}
            sub={`Avg rating: ${(stats.deptChartData.find(d => d.name === stats.topDept)?.avgRating || 0).toFixed(1)}`}
            accent="violet" isDark={isDark} delay={240} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <DeptChart data={stats.deptChartData} isDark={isDark} />
          <PerfChart data={stats.perfDist} isDark={isDark} />
          <SalaryChart data={stats.salaryDist} isDark={isDark} />
        </div>

        {/* Full-width Table */}
        <EmployeeTable employees={employees} quickSearch={search} isDark={isDark} />
      </main>

      <footer className={`mt-10 pb-8 text-center text-xs
        ${isDark ? "text-slate-800" : "text-slate-300"}`}>
        PeopleOS · Employee Management Platform · {employees.length} records
      </footer>
    </div>
  );
}
