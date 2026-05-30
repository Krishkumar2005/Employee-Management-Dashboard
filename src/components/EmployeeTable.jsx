import { useRef, useMemo, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

const DEPT_COLORS = {
  Engineering: { bg: "bg-blue-50",  text: "text-blue-700",   border: "border-blue-200",   dbg: "bg-blue-950/40",   dtxt: "text-blue-300",   dbdr: "border-blue-800/60" },
  Marketing:   { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  dbg: "bg-amber-950/40",  dtxt: "text-amber-300",  dbdr: "border-amber-800/60" },
  Sales:       { bg: "bg-emerald-50",text: "text-emerald-700",border: "border-emerald-200",dbg: "bg-emerald-950/40",dtxt: "text-emerald-300",dbdr: "border-emerald-800/60" },
  HR:          { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dbg: "bg-purple-950/40", dtxt: "text-purple-300", dbdr: "border-purple-800/60" },
  Finance:     { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dbg: "bg-orange-950/40", dtxt: "text-orange-300", dbdr: "border-orange-800/60" },
};

const AVATAR_COLORS = ["#7c6f9f","#4a8c7a","#9f7c4a","#7c4a6f","#4a7c8c","#8c7c4a"];

function NameCell({isDark, data }) {
  const initials = `${data.firstName[0]}${data.lastName[0]}`;
  const color = AVATAR_COLORS[data.id % AVATAR_COLORS.length];
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
        style={{ background: `${color}18`, border: `1.5px solid ${color}40`, color }}>
        {initials}
      </div>
      <div>
        <div className={`text-[13px] font-medium leading-tight ${!isDark? "text-slate-800": "text-slate-100"}`}>
          {data.firstName} {data.lastName}
        </div>
        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{data.location}</div>
      </div>
    </div>
  );
}

function DeptCell({isDark, value }) {
  const c = DEPT_COLORS[value] || DEPT_COLORS.Engineering;
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-semibold border
      ${
  isDark
    ? `${c.dbg} ${c.dtxt} ${c.dbdr}`
    : `${c.bg} ${c.text} ${c.border}`
}`}>
      {value}
    </span>
  );
}

function StatusCell({isDark, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${value ? "bg-emerald-500" : !isDark ? "bg-slate-300": "dark:bg-slate-600"}`} />
      <span className={`text-[12px] font-medium ${value ? `${!isDark? "text-emerald-600": "text-emerald-400" }` : "text-slate-400"}`}>
        {value ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

function RatingCell({isDark, value }) {
  const pct = ((value - 3.5) / 1.5) * 100;
  const color = value >= 4.5 ? "#16a34a" : value >= 4.0 ? "#4a6fa8" : "#ca8a04";
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="font-mono text-[12px] font-semibold w-7 shrink-0" style={{ color }}>{value}</span>
      <div className={`flex-1 h-1.5 rounded-full ${!isDark? "bg-slate-100": "bg-white/10"} overflow-hidden`}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function SalaryCell({ isDark, value }) {
  return (
    <span className={`font-mono text-[12px] font-semibold ${!isDark? "text-slate-700":"text-slate-200"}`}>
      ${value.toLocaleString()}
    </span>
  );
}

function SkillsCell({ isDark, value }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap py-1">
      {value.slice(0, 2).map((s) => (
        <span key={s}
          className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${!isDark?"bg-slate-100 border-slate-200 text-slate-600": "bg-slate-700/60 border-slate-600/60 text-slate-300"} whitespace-nowrap`}>
          {s}
        </span>
      ))}
      {value.length > 2 && (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${!isDark? "bg-slate-100 border-slate-200 text-slate-400": "bg-slate-700/60 border-slate-600/60 text-slate-400"}`}>
          +{value.length - 2}
        </span>
      )}
    </div>
  );
}

const PAGE_SIZE = 7;

export default function EmployeeTable({ employees, quickSearch, isDark }) {
  const [currentPage, setCurrentPage] = useState(1);

  const colDefs = useMemo(() => [
    {
      headerName: "Employee",
      field: "firstName",
      cellRenderer: ({ data }) => <NameCell isDark={isDark} data={data} />,
      minWidth: 220,
      flex: 2,
      filter: "agTextColumnFilter",
      valueGetter: (p) => `${p.data.firstName} ${p.data.lastName}`,
      floatingFilter: true,
    },
    {
      headerName: "Department",
      field: "department",
      cellRenderer: ({ value }) => <DeptCell isDark={isDark} value={value} />,
      minWidth: 150,
      flex: 1.2,
      filter: "agSetColumnFilter",
      floatingFilter: true,
    },
    {
      headerName: "Position",
      field: "position",
      minWidth: 180,
      flex: 1.8,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      cellStyle: { fontSize: "12px", color: "inherit" },
    },
    {
      headerName: "Salary",
      field: "salary",
      cellRenderer: ({ value }) => <SalaryCell isDark={isDark} value={value} />,
      minWidth: 130,
      flex: 1,
      filter: "agNumberColumnFilter",
      floatingFilter: true,
      sortable: true,
    },
    {
      headerName: "Rating",
      field: "performanceRating",
      cellRenderer: ({ value }) => <RatingCell isDark={isDark} value={value} />,
      minWidth: 160,
      flex: 1.4,
      filter: "agNumberColumnFilter",
      floatingFilter: true,
      sortable: true,
    },
    {
      headerName: "Skills",
      field: "skills",
      cellRenderer: ({ value }) => <SkillsCell isDark={isDark} value={value} />,
      minWidth: 220,
      flex: 2,
      sortable: false,
      filter: false,
    },
    {
      headerName: "Status",
      field: "isActive",
      cellRenderer: ({ value }) => <StatusCell isDark={isDark} value={value} />,
      minWidth: 110,
      flex: 0.9,
      filter: "agSetColumnFilter",
      floatingFilter: true,
      filterValueGetter: (p) => p.data.isActive ? "Active" : "Inactive",
    },
  ], [isDark]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    cellStyle: { display: "flex", alignItems: "center", paddingTop: "0", paddingBottom: "0" },
  }), []);

  const filteredData = useMemo(() => {
    if (!quickSearch) return employees;
    const q = quickSearch.toLowerCase();
    return employees.filter(e =>
      `${e.firstName} ${e.lastName} ${e.department} ${e.position} ${e.location}`.toLowerCase().includes(q)
    );
  }, [employees, quickSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageData = filteredData.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useMemo(() => { setCurrentPage(1); }, [quickSearch]);

  const onExport = useCallback(() => {
    const headers = ["Name","Department","Position","Salary","Rating","Active","Location"];
    const rows = filteredData.map(e => [
      `${e.firstName} ${e.lastName}`, e.department, e.position, e.salary, e.performanceRating, e.isActive, e.location
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv," + encodeURIComponent(csv);
    a.download = "employees.csv"; a.click();
  }, [filteredData]);

  const rowH = 60;
  const headerH = 48;
  const filterH = 42;
  const gridHeight = PAGE_SIZE * rowH + headerH + filterH;

  return (
    <div className={`rounded-2xl border overflow-hidden w-full
      ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>

      {/* Top bar */}
      <div className={`flex items-center justify-between px-6 py-4 border-b
        ${isDark ? "border-slate-800" : "border-slate-100"}`}>
        <div>
          <div className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-800"}`}>
            Employee Roster
          </div>
          <div className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            {filteredData.length} records
          </div>
        </div>
        <button onClick={onExport}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all
            ${isDark
              ? "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white bg-slate-800/50"
              : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 bg-white"
            }`}>
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* Grid */}
      <div className={`ag-theme-alpine ${isDark ? "dark-theme" : "light-theme"}`} style={{ height: `${gridHeight}px`, width: "100%" }}>
        <AgGridReact
          rowData={pageData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          domLayout="normal"
          headerHeight={headerH}
          rowHeight={rowH}
          floatingFiltersHeight={filterH}
          suppressHorizontalScroll={false}
        />
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between px-6 py-3.5 border-t
        ${isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-100 bg-slate-50"}`}>

        <span className={`text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filteredData.length)} of {filteredData.length}
        </span>

        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-medium border transition-all
              ${safePage <= 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              ${isDark
                ? "border-slate-700 text-slate-300 bg-slate-800/60 hover:border-slate-600"
                : "border-slate-200 text-slate-600 bg-white hover:border-slate-300"
              }`}>
            <ChevronLeft size={13} /> Prev
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-[11px] font-medium border transition-all
                  ${pg === safePage
                    ? isDark
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-slate-800 border-slate-800 text-white"
                    : isDark
                      ? "border-slate-700 text-slate-400 bg-slate-800/40 hover:border-slate-600 hover:text-slate-200"
                      : "border-slate-200 text-slate-500 bg-white hover:border-slate-300 hover:text-slate-700"
                  }`}>
                {pg}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-medium border transition-all
              ${safePage >= totalPages ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              ${isDark
                ? "border-slate-700 text-slate-300 bg-slate-800/60 hover:border-slate-600"
                : "border-slate-200 text-slate-600 bg-white hover:border-slate-300"
              }`}>
            Next <ChevronRight size={13} />
          </button>
        </div>

        <span className={`text-[11px] ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          Page {safePage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
