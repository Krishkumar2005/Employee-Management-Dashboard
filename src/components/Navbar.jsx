import { Sun, Moon, Search, Users } from "lucide-react";

export default function Navbar({ isDark, onToggleTheme, search, onSearch }) {
  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300
      ${isDark
        ? "bg-slate-950/80 border-slate-800/60 backdrop-blur-xl"
        : "bg-white/80 border-slate-200/80 backdrop-blur-xl"
      }`}>
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Users size={15} className="text-indigo-400" />
          </div>
          <div>
            <span className={`font-display font-700 text-[15px] tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              PeopleOS
            </span>
          </div>
        </div>

        <div className={`w-px h-5 ${isDark ? "bg-slate-700" : "bg-slate-200"}`} />

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
          <input
            type="text"
            placeholder="Search employees…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg border transition-all outline-none
              ${isDark
                ? "bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:bg-slate-800"
                : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400 focus:bg-white"
              }`}
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* <div className={`text-xs font-mono px-2.5 py-1 rounded-md border
            ${isDark ? "text-slate-400 border-slate-700 bg-slate-800/60" : "text-slate-500 border-slate-200 bg-slate-50"}`}>
            v2.1.0
          </div> */}

          <button
            onClick={onToggleTheme}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200
              ${isDark
                ? "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-400"
                : "bg-white border-slate-200 text-slate-500 hover:border-indigo-400 hover:text-indigo-500"
              }`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
