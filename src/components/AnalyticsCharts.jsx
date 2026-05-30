import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

const DEPT_COLORS = {
  Engineering: '#6366f1',
  Marketing:   '#a855f7',
  Sales:       '#f97316',
  HR:          '#10b981',
  Finance:     '#3b82f6',
}

const RATING_COLORS = ['#f97316', '#3b82f6', '#6366f1', '#10b981']
const SALARY_COLORS = ['#94a3b8', '#6366f1', '#a855f7', '#10b981']

function ChartCard({ title, subtitle, children, delay }) {
  return (
    <div className={`${delay} bg-white dark:bg-panel-dark border border-border dark:border-border-dark rounded-2xl p-5 shadow-card dark:shadow-card-dark`}>
      <div className="mb-4">
        <h3 className="font-display font-semibold text-[14px] text-gray-900 dark:text-white">{title}</h3>
        <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

function CustomTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-[#1e2128] border border-border dark:border-border-dark rounded-xl px-3 py-2.5 shadow-card-hover text-[12px]">
      {label && <div className="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</div>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
          <span className="text-gray-500 dark:text-gray-400">{p.name}:</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {p.name === 'avgSalary' ? `$${(p.value/1000).toFixed(0)}K` : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-[#1e2128] border border-border dark:border-border-dark rounded-xl px-3 py-2 shadow-card-hover text-[12px]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill || payload[0].color }} />
        <span className="font-medium text-gray-800 dark:text-gray-200">{payload[0].name}</span>
        <span className="text-gray-500 dark:text-gray-400">{payload[0].value}</span>
      </div>
    </div>
  )
}

function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function AnalyticsCharts({ chartData, isDark }) {
  const { deptData, ratingData, salaryData } = chartData
  const gridColor = isDark ? '#252830' : '#f0f2f5'
  const axisColor = isDark ? '#4b5563' : '#9ca3af'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Dept Employee Distribution */}
      <ChartCard
        title="Department Distribution"
        subtitle="Headcount by department"
        delay="animate-slide-up-d1"
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={deptData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => v.slice(0, 3)} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="employees" name="Employees" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {deptData.map((entry) => (
                <Cell key={entry.name} fill={DEPT_COLORS[entry.name] || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3">
          {deptData.map(d => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DEPT_COLORS[d.name] }} />
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{d.name} ({d.employees})</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Performance Rating Pie */}
      <ChartCard
        title="Performance Ratings"
        subtitle="Distribution across all staff"
        delay="animate-slide-up-d2"
      >
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="60%" height={200}>
            <PieChart>
              <Pie
                data={ratingData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
              >
                {ratingData.map((entry, i) => (
                  <Cell key={entry.name} fill={RATING_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2.5">
            {ratingData.map((d, i) => (
              <div key={d.name}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-500 dark:text-gray-400">{d.name}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{d.value}</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-[#252830] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full progress-animated"
                    style={{ '--target-width': `${(d.value / 20) * 100}%`, backgroundColor: RATING_COLORS[i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>

      {/* Salary Distribution */}
      <ChartCard
        title="Salary Bands"
        subtitle="Compensation range overview"
        delay="animate-slide-up-d3"
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={salaryData} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
            <XAxis type="number" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} width={58} />
            <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="value" name="Employees" radius={[0, 6, 6, 0]} maxBarSize={22}>
              {salaryData.map((entry, i) => (
                <Cell key={entry.name} fill={SALARY_COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
