import { useEffect, useState } from "react";

export default function StatCard({ icon: Icon, label, value, sub, accent, isDark, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0);
  const isNum = typeof value === "number";

  useEffect(() => {
    if (!isNum) return;
    let start = 0;
    const end = value;
    const duration = 900;
    const step = duration / 60;
    const inc = end / 60;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += inc;
        if (start >= end) { setDisplayed(end); clearInterval(interval); }
        else setDisplayed(Math.floor(start));
      }, step);
    }, delay);
    return () => clearTimeout(timer);
  }, [value]);

  const colors = {
    indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", dot: "bg-indigo-400" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", dot: "bg-amber-400" },
    violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", dot: "bg-violet-400" },
  };
  const c = colors[accent] || colors.indigo;

  return (
    <div className={`group relative rounded-2xl border p-6 transition-all duration-300 cursor-default animate-slide-up
      ${isDark
        ? "bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80"
        : "bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
      }`}
      style={{ animationDelay: `${delay}ms` }}>

      <div className="flex items-start justify-between mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} border ${c.border}`}>
          <Icon size={18} className={c.text} />
        </div>
        <div className={`w-2 h-2 rounded-full ${c.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>

      <div className={`font-display text-3xl font-700 tracking-tight mb-1
        ${isDark ? "text-white" : "text-slate-900"}`}>
        {isNum ? displayed.toLocaleString() : value}
      </div>

      <div className={`text-xs font-medium uppercase tracking-widest mb-1
        ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        {label}
      </div>

      {sub && (
        <div className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>{sub}</div>
      )}
    </div>
  );
}
