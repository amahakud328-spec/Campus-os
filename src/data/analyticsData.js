export const attendanceWeeklyTrends = [
  { week: "Week 1", rate: 88, attended: 18, total: 20 },
  { week: "Week 2", rate: 85, attended: 17, total: 20 },
  { week: "Week 3", rate: 90, attended: 19, total: 21 },
  { week: "Week 4", rate: 80, attended: 16, total: 20 },
  { week: "Week 5", rate: 75, attended: 15, total: 20 },
  { week: "Week 6", rate: 82, attended: 17, total: 21 },
  { week: "Week 7 (Current)", rate: 82, attended: 16, total: 20 },
];

export const adminSummaryStats = {
  totalStudents: { value: 5240, trend: "+12% from last month", isPositive: true },
  pendingRequests: { value: 128, trend: "-18% from last week", isPositive: true },
  openComplaints: { value: 42, trend: "-8% from last week", isPositive: true },
  resolvedToday: { value: 67, trend: "+24% vs yesterday", isPositive: true },
  avgResolutionTime: { value: "18 hrs", trend: "-25% (was 24 hrs)", isPositive: true }
};

export const requestsByCategory = [
  { name: "Leave Applications", count: 48, fill: "#4f46e5" },
  { name: "Gate Passes", count: 72, fill: "#06b6d4" },
  { name: "Certificates", count: 34, fill: "#10b981" },
  { name: "Hostel Complaints", count: 28, fill: "#f59e0b" },
  { name: "Mess Issues", count: 18, fill: "#ec4899" },
  { name: "Fee Queries", count: 12, fill: "#8b5cf6" }
];

export const requestsOverTime = [
  { day: "Mon", leave: 14, gatePass: 24, complaints: 8, certificates: 9 },
  { day: "Tue", leave: 18, gatePass: 28, complaints: 12, certificates: 11 },
  { day: "Wed", leave: 12, gatePass: 32, complaints: 9, certificates: 7 },
  { day: "Thu", leave: 16, gatePass: 38, complaints: 14, certificates: 8 },
  { day: "Fri", leave: 28, gatePass: 55, complaints: 11, certificates: 14 },
  { day: "Sat", leave: 35, gatePass: 62, complaints: 7, certificates: 6 },
  { day: "Sun", leave: 20, gatePass: 41, complaints: 5, certificates: 4 }
];

export const departmentResolutionTime = [
  { department: "Hostel Admin", currentHours: 12, previousHours: 18 },
  { department: "Academic Cell", currentHours: 22, previousHours: 32 },
  { department: "Mess Committee", currentHours: 8, previousHours: 14 },
  { department: "Estate & Repairs", currentHours: 16, previousHours: 24 },
  { department: "IT & Network", currentHours: 6, previousHours: 12 },
  { department: "Accounts & Fees", currentHours: 20, previousHours: 28 }
];

export const messAnalytics = {
  totalComplaints: 24,
  averageRating: 4.2,
  openIssues: 5,
  resolvedIssues: 19,
  categories: [
    { category: "Food Quality", count: 9, percentage: 37.5 },
    { category: "Hygiene", count: 5, percentage: 20.8 },
    { category: "Timing", count: 4, percentage: 16.7 },
    { category: "Menu Variety", count: 3, percentage: 12.5 },
    { category: "Staff Behavior", count: 3, percentage: 12.5 }
  ],
  weeklyRatings: [
    { week: "Week 1", rating: 3.8, breakfast: 4.1, lunch: 3.6, dinner: 3.7 },
    { week: "Week 2", rating: 4.0, breakfast: 4.3, lunch: 3.9, dinner: 3.8 },
    { week: "Week 3", rating: 4.1, breakfast: 4.4, lunch: 4.0, dinner: 3.9 },
    { week: "Week 4", rating: 4.3, breakfast: 4.5, lunch: 4.2, dinner: 4.2 },
    { week: "Current", rating: 4.2, breakfast: 4.5, lunch: 4.1, dinner: 4.0 }
  ],
  weeklyComplaints: [
    { week: "Week 1", total: 14, resolved: 12 },
    { week: "Week 2", total: 10, resolved: 9 },
    { week: "Week 3", total: 8, resolved: 8 },
    { week: "Week 4", total: 5, resolved: 4 },
    { week: "Current", total: 4, resolved: 2 }
  ]
};

export const frequentlyOccurringProblems = [
  {
    rank: 1,
    issue: "Hostel Wi-Fi Dropping & High Latency",
    category: "IT & Connectivity",
    frequency: "64 reports/month",
    avgResolution: "8.5 hrs",
    impact: "High",
    actionTaken: "High-density mesh routers being installed across Block C & D."
  },
  {
    rank: 2,
    issue: "Hostel Plumbing & Tap Leakage",
    category: "Estate Maintenance",
    frequency: "48 reports/month",
    avgResolution: "14.2 hrs",
    impact: "Medium",
    actionTaken: "Dedicated on-call plumber stationed at hostel reception."
  },
  {
    rank: 3,
    issue: "Mess Food Temperature & Dinner Peak Rush",
    category: "Mess & Catering",
    frequency: "32 reports/month",
    avgResolution: "6.0 hrs",
    impact: "Medium",
    actionTaken: "Added second buffet line and hot food warmers."
  },
  {
    rank: 4,
    issue: "Bonafide & NOC Certificate Processing Delays",
    category: "Academic Registrar",
    frequency: "27 reports/month",
    avgResolution: "36.0 hrs",
    impact: "Medium",
    actionTaken: "Enabled digital e-signature generation in CampusConnect."
  },
  {
    rank: 5,
    issue: "Fee Installment Portal & Bank Reconciliation",
    category: "Accounts Cell",
    frequency: "19 reports/month",
    avgResolution: "21.0 hrs",
    impact: "Low",
    actionTaken: "Direct UPI instant reconciliation gateway integrated."
  }
];

export const studentRoster = [
  { id: "CS-2023-0842", name: "Akash Mahakud", dept: "CSE", year: "3rd Year", hostel: "Block C-304", attendance: 82, cgpa: 8.84, status: "Active" },
  { id: "CS-2023-0811", name: "Sneha Roy", dept: "CSE", year: "3rd Year", hostel: "Block A-201", attendance: 91, cgpa: 9.12, status: "Active" },
  { id: "CS-2023-0855", name: "Rohan Varma", dept: "CSE", year: "3rd Year", hostel: "Block C-304", attendance: 78, cgpa: 8.21, status: "Active" },
  { id: "ME-2023-0402", name: "Vikram Malhotra", dept: "Mechanical", year: "3rd Year", hostel: "Block B-112", attendance: 85, cgpa: 7.95, status: "Active" },
  { id: "EC-2023-0219", name: "Ananya Deshmukh", dept: "ECE", year: "3rd Year", hostel: "Block A-308", attendance: 88, cgpa: 9.35, status: "Active" },
  { id: "EE-2023-0510", name: "Arjun Nambiar", dept: "Electrical", year: "3rd Year", hostel: "Day Scholar", attendance: 74, cgpa: 8.10, status: "Warning" },
  { id: "IT-2024-0104", name: "Tanvi Sharma", dept: "IT", year: "2nd Year", hostel: "Block A-104", attendance: 94, cgpa: 9.50, status: "Active" },
  { id: "CV-2022-0701", name: "Deepak Kumar", dept: "Civil", year: "4th Year", hostel: "Block D-205", attendance: 80, cgpa: 7.80, status: "Active" }
];
