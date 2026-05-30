import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid, Cell
} from "recharts";

const DEPT_COLORS = {
  Engineering: "#6366f1",
  Marketing: "#f59e0b",
  Sales: "#10b981",
  HR: "#ec4899",
  Finance: "#3b82f6",
};

function CustomTooltip({ active, payload, label, isDark, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-3 py-2 rounded-xl text-xs border shadow-xl
      ${isDark ? "bg-slate-900 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`}>
      <div className="font-display font-600 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color || p.fill }} />
          <span>{formatter ? formatter(p.value, p.name) : `${p.name}: ${p.value}`}</span>
        </div>
      ))}
    </div>
  );
}

export function DeptChart({ data, isDark }) {
  return (
    <div className={`rounded-2xl border p-6 h-[280px]
      ${isDark ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-100 shadow-sm"}`}>
      <div className={`font-display font-600 text-sm mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
        Department Distribution
      </div>
      <div className={`text-xs mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        Headcount per department
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} barSize={28}>
          <CartesianGrid vertical={false} stroke={isDark ? "rgba(148,163,184,0.06)" : "rgba(0,0,0,0.05)"} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8", fontFamily: "Syne" }}
            axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} formatter={(v, n) => `${v} employees`} />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={DEPT_COLORS[entry.name] || "#6366f1"} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PerfChart({ data, isDark }) {
  return (
    <div className={`rounded-2xl border p-6 h-[280px]
      ${isDark ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-100 shadow-sm"}`}>
      <div className={`font-display font-600 text-sm mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
        Performance Distribution
      </div>
      <div className={`text-xs mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        Rating band breakdown
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} barSize={36}>
          <CartesianGrid vertical={false} stroke={isDark ? "rgba(148,163,184,0.06)" : "rgba(0,0,0,0.05)"} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8", fontFamily: "Syne" }}
            axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} formatter={(v) => `${v} employees`} />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#6366f1" fillOpacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalaryChart({ data, isDark }) {
  return (
    <div className={`rounded-2xl border p-6 h-[280px]
      ${isDark ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-100 shadow-sm"}`}>
      <div className={`font-display font-600 text-sm mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
        Salary Distribution
      </div>
      <div className={`text-xs mb-5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        Headcount by salary range
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={isDark ? "rgba(148,163,184,0.06)" : "rgba(0,0,0,0.05)"} />
          <XAxis dataKey="range" tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8", fontFamily: "Syne" }}
            axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: isDark ? "#64748b" : "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip isDark={isDark} formatter={(v) => `${v} employees`} />} />
          <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2}
            fill="url(#salGrad)" dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
