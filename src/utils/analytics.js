export function computeStats(employees) {
  const total = employees.length;
  const active = employees.filter((e) => e.isActive).length;
  const avgSalary = Math.round(employees.reduce((s, e) => s + e.salary, 0) / total);
  const avgRating = (employees.reduce((s, e) => s + e.performanceRating, 0) / total).toFixed(1);

  // Department counts
  const deptMap = {};
  employees.forEach((e) => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });

  // Top department by avg performance
  const deptPerf = {};
  const deptCount = {};
  employees.forEach((e) => {
    deptPerf[e.department] = (deptPerf[e.department] || 0) + e.performanceRating;
    deptCount[e.department] = (deptCount[e.department] || 0) + 1;
  });
  const topDept = Object.keys(deptPerf).reduce((a, b) =>
    deptPerf[a] / deptCount[a] > deptPerf[b] / deptCount[b] ? a : b
  );

  // Dept chart data
  const deptChartData = Object.entries(deptMap).map(([name, count]) => ({
    name,
    count,
    avgRating: +(deptPerf[name] / deptCount[name]).toFixed(2),
  }));

  // Salary buckets
  const buckets = [
    { range: "50–70k", min: 50000, max: 70000 },
    { range: "70–90k", min: 70000, max: 90000 },
    { range: "90–110k", min: 90000, max: 110000 },
    { range: "110–140k", min: 110000, max: 140000 },
    { range: "140k+", min: 140000, max: Infinity },
  ];
  const salaryDist = buckets.map((b) => ({
    range: b.range,
    count: employees.filter((e) => e.salary >= b.min && e.salary < b.max).length,
  }));

  // Performance dist
  const perfBuckets = [
    { label: "3.5–3.9", min: 3.5, max: 4.0 },
    { label: "4.0–4.2", min: 4.0, max: 4.3 },
    { label: "4.3–4.5", min: 4.3, max: 4.6 },
    { label: "4.6–4.8", min: 4.6, max: 5.0 },
  ];
  const perfDist = perfBuckets.map((b) => ({
    label: b.label,
    count: employees.filter((e) => e.performanceRating >= b.min && e.performanceRating < b.max).length,
  }));

  return { total, active, avgSalary, avgRating, topDept, deptChartData, salaryDist, perfDist };
}

export function formatSalary(v) {
  return "$" + (v / 1000).toFixed(0) + "k";
}
