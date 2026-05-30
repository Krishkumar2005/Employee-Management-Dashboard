export function formatSalary(value) {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

export function formatSalaryFull(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function getTenure(hireDate) {
  const hire = new Date(hireDate)
  const now = new Date()
  const years = (now - hire) / (1000 * 60 * 60 * 24 * 365)
  if (years < 1) return `${Math.round(years * 12)}mo`
  return `${years.toFixed(1)}yr`
}

export function getRatingColor(rating, isDark) {
  if (rating >= 4.5) return isDark ? '#34d399' : '#059669'
  if (rating >= 4.0) return isDark ? '#60a5fa' : '#2563eb'
  if (rating >= 3.5) return isDark ? '#fbbf24' : '#d97706'
  return isDark ? '#f87171' : '#dc2626'
}

export function getDeptColor(dept) {
  const map = {
    Engineering: { bg: '#eef2ff', text: '#4f46e5', dot: '#6366f1', dark_bg: '#1e1f3a', dark_text: '#818cf8' },
    Marketing:   { bg: '#fdf4ff', text: '#9333ea', dot: '#a855f7', dark_bg: '#2a1a3a', dark_text: '#c084fc' },
    Sales:       { bg: '#fff7ed', text: '#ea580c', dot: '#f97316', dark_bg: '#2d1f0f', dark_text: '#fb923c' },
    HR:          { bg: '#ecfdf5', text: '#059669', dot: '#10b981', dark_bg: '#0d2a1f', dark_text: '#34d399' },
    Finance:     { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6', dark_bg: '#0f1e36', dark_text: '#60a5fa' },
  }
  return map[dept] || { bg: '#f9fafb', text: '#374151', dot: '#6b7280', dark_bg: '#1f2937', dark_text: '#9ca3af' }
}

export function computeStats(employees) {
  const active = employees.filter(e => e.isActive)
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length)
  const avgRating = (employees.reduce((s, e) => s + e.performanceRating, 0) / employees.length).toFixed(2)

  const deptCounts = {}
  employees.forEach(e => { deptCounts[e.department] = (deptCounts[e.department] || 0) + 1 })
  const topDept = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])[0][0]

  const deptRatings = {}
  const deptTotal = {}
  employees.forEach(e => {
    if (!deptRatings[e.department]) { deptRatings[e.department] = 0; deptTotal[e.department] = 0 }
    deptRatings[e.department] += e.performanceRating
    deptTotal[e.department]++
  })

  return {
    total: employees.length,
    active: active.length,
    inactive: employees.length - active.length,
    avgSalary,
    avgRating: parseFloat(avgRating),
    topDept,
    deptCounts,
    deptRatings,
    deptTotal,
  }
}

export function buildChartData(employees) {
  const depts = {}
  employees.forEach(e => {
    if (!depts[e.department]) depts[e.department] = { name: e.department, count: 0, totalSalary: 0, totalRating: 0 }
    depts[e.department].count++
    depts[e.department].totalSalary += e.salary
    depts[e.department].totalRating += e.performanceRating
  })

  const deptData = Object.values(depts).map(d => ({
    name: d.name,
    employees: d.count,
    avgSalary: Math.round(d.totalSalary / d.count),
    avgRating: parseFloat((d.totalRating / d.count).toFixed(2)),
  }))

  const ratingBuckets = { '3.5–3.9': 0, '4.0–4.2': 0, '4.3–4.5': 0, '4.6+': 0 }
  employees.forEach(e => {
    const r = e.performanceRating
    if (r < 4.0) ratingBuckets['3.5–3.9']++
    else if (r < 4.3) ratingBuckets['4.0–4.2']++
    else if (r < 4.6) ratingBuckets['4.3–4.5']++
    else ratingBuckets['4.6+']++
  })
  const ratingData = Object.entries(ratingBuckets).map(([name, value]) => ({ name, value }))

  const salaryBuckets = { '<$70K': 0, '$70–90K': 0, '$90–120K': 0, '$120K+': 0 }
  employees.forEach(e => {
    if (e.salary < 70000) salaryBuckets['<$70K']++
    else if (e.salary < 90000) salaryBuckets['$70–90K']++
    else if (e.salary < 120000) salaryBuckets['$90–120K']++
    else salaryBuckets['$120K+']++
  })
  const salaryData = Object.entries(salaryBuckets).map(([name, value]) => ({ name, value }))

  return { deptData, ratingData, salaryData }
}

export function exportToCSV(employees) {
  const headers = ['ID','First Name','Last Name','Email','Department','Position','Salary','Hire Date','Age','Location','Performance Rating','Projects Completed','Active','Skills','Manager']
  const rows = employees.map(e => [
    e.id, e.firstName, e.lastName, e.email, e.department, e.position,
    e.salary, e.hireDate, e.age, e.location, e.performanceRating,
    e.projectsCompleted, e.isActive ? 'Yes' : 'No',
    e.skills.join('; '), e.manager || '—'
  ])
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'employees.csv'; a.click()
  URL.revokeObjectURL(url)
}
