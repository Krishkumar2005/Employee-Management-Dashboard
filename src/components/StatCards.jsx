import { Users, UserCheck, DollarSign, TrendingUp } from 'lucide-react'
import { useCounter } from '../hooks/useCounter'
import { formatSalary } from '../utils/helpers'

function StatCard({ icon: Icon, label, value, sub, color, delay, prefix = '', suffix = '' }) {
  const animated = useCounter(typeof value === 'number' ? value : 0, 900)
  const display = typeof value === 'number'
    ? `${prefix}${animated.toLocaleString()}${suffix}`
    : value

  return (
    <div
      className={`animate-slide-up relative group overflow-hidden
        bg-white dark:bg-panel-dark
        border border-border dark:border-border-dark
        rounded-2xl p-5
        shadow-card dark:shadow-card-dark
        hover:shadow-card-hover dark:hover:shadow-card-hover-dark
        hover:-translate-y-0.5
        transition-all duration-300 ease-out
        ${delay}`}
    >
      {/* Subtle glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${color.glow}`} />

      <div className="relative">
        {/* Icon */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${color.iconBg}`}>
          <Icon size={16} className={color.iconText} strokeWidth={2} />
        </div>

        {/* Value */}
        <div className={`font-display text-[28px] font-bold leading-none tracking-tight mb-1.5 ${color.value}`}>
          {display}
        </div>

        {/* Label & sub */}
        <div className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{label}</div>
        {sub && (
          <div className={`text-[11px] mt-1.5 font-medium ${color.sub}`}>{sub}</div>
        )}
      </div>
    </div>
  )
}

export default function StatCards({ stats }) {
  const activeRate = Math.round((stats.active / stats.total) * 100)

  const cards = [
    {
      icon: Users,
      label: 'Total Employees',
      value: stats.total,
      sub: `${stats.inactive} inactive`,
      color: {
        iconBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        iconText: 'text-indigo-500 dark:text-indigo-400',
        value: 'text-gray-900 dark:text-white',
        sub: 'text-gray-400 dark:text-gray-500',
        glow: 'bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/20',
      },
      delay: 'animate-slide-up-d1',
    },
    {
      icon: UserCheck,
      label: 'Active Employees',
      value: stats.active,
      sub: `${activeRate}% active rate`,
      color: {
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        iconText: 'text-emerald-500 dark:text-emerald-400',
        value: 'text-gray-900 dark:text-white',
        sub: 'text-emerald-600 dark:text-emerald-400',
        glow: 'bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20',
      },
      delay: 'animate-slide-up-d2',
    },
    {
      icon: DollarSign,
      label: 'Avg. Salary',
      value: stats.avgSalary,
      prefix: '$',
      sub: 'across all departments',
      color: {
        iconBg: 'bg-amber-50 dark:bg-amber-950/50',
        iconText: 'text-amber-500 dark:text-amber-400',
        value: 'text-gray-900 dark:text-white',
        sub: 'text-gray-400 dark:text-gray-500',
        glow: 'bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/20',
      },
      delay: 'animate-slide-up-d3',
    },
    {
      icon: TrendingUp,
      label: 'Top Department',
      value: stats.topDept,
      sub: `${stats.deptCounts[stats.topDept]} employees`,
      color: {
        iconBg: 'bg-violet-50 dark:bg-violet-950/50',
        iconText: 'text-violet-500 dark:text-violet-400',
        value: 'text-[22px] text-gray-900 dark:text-white',
        sub: 'text-violet-600 dark:text-violet-400',
        glow: 'bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-950/20',
      },
      delay: 'animate-slide-up-d4',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(card => <StatCard key={card.label} {...card} />)}
    </div>
  )
}
