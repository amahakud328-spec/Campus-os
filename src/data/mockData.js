export const initialStudentProfile = {
  name: "Akash Mahakud",
  studentId: "CS-2023-0842",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  department: "Computer Science & Engineering",
  degree: "B.Tech",
  year: "3rd Year",
  semester: "6th Semester",
  cgpa: "8.84",
  email: "akash.m@campusconnect.edu",
  phone: "+91 98765 43210",
  hostel: "Block C (Boys Hostel)",
  room: "Room C-304",
  bloodGroup: "O+",
  emergencyContact: "+91 98765 11223 (Father)",
  academicMentor: "Dr. Sunita Rao (Assoc. Prof, CSE)",
  roommates: [
    { name: "Rohan Varma", id: "CS-2023-0855", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
    { name: "Priya Ranjan", id: "CS-2023-0862", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
  ],
  warden: {
    name: "Dr. K. S. Mukherjee",
    designation: "Senior Hostel Warden (Block C)",
    phone: "+91 94370 99887",
    email: "warden.blockc@campusconnect.edu",
    office: "Block C Warden Office, Ground Floor"
  }
};

export const initialAdminProfile = {
  name: "Dr. Rajesh Sharma",
  adminId: "ADM-2021-04",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250",
  department: "Student Affairs & Administration",
  role: "Chief Dean of Student Welfare",
  email: "r.sharma@campusconnect.edu",
  phone: "+91 94370 12345",
  office: "Admin Block, Room 102",
  officeHours: "10:00 AM - 01:00 PM (Mon-Fri)"
};

export const timetableData = {
  Monday: [
    { time: "09:00 AM - 10:00 AM", subject: "Database Management Systems", code: "CS301", room: "Room 204", teacher: "Dr. Sunita Rao", type: "Lecture", color: "indigo" },
    { time: "10:00 AM - 11:00 AM", subject: "Digital Logic Design", code: "CS302", room: "Room 301", teacher: "Prof. K. Verma", type: "Lecture", color: "cyan" },
    { time: "11:30 AM - 01:00 PM", subject: "Python Programming Lab", code: "CS303L", room: "Software Lab 2", teacher: "Dr. Ananya Sen", type: "Lab", color: "emerald" },
    { time: "02:00 PM - 03:00 PM", subject: "Computer Networks", code: "CS304", room: "Room 204", teacher: "Prof. Amit Patel", type: "Lecture", color: "amber" },
    { time: "03:15 PM - 04:15 PM", subject: "Software Engineering", code: "CS305", room: "Room 105", teacher: "Dr. Meenakshi D.", type: "Tutorial", color: "purple" }
  ],
  Tuesday: [
    { time: "09:00 AM - 10:00 AM", subject: "Computer Networks", code: "CS304", room: "Room 204", teacher: "Prof. Amit Patel", type: "Lecture", color: "amber" },
    { time: "10:00 AM - 11:00 AM", subject: "Database Management Systems", code: "CS301", room: "Room 204", teacher: "Dr. Sunita Rao", type: "Lecture", color: "indigo" },
    { time: "11:30 AM - 12:30 PM", subject: "Software Engineering", code: "CS305", room: "Room 105", teacher: "Dr. Meenakshi D.", type: "Lecture", color: "purple" },
    { time: "02:00 PM - 04:00 PM", subject: "Database Systems Lab", code: "CS301L", room: "Data Center Lab", teacher: "Dr. Sunita Rao", type: "Lab", color: "indigo" }
  ],
  Wednesday: [
    { time: "09:00 AM - 10:00 AM", subject: "Digital Logic Design", code: "CS302", room: "Room 301", teacher: "Prof. K. Verma", type: "Lecture", color: "cyan" },
    { time: "10:00 AM - 11:00 AM", subject: "Computer Networks", code: "CS304", room: "Room 204", teacher: "Prof. Amit Patel", type: "Lecture", color: "amber" },
    { time: "11:30 AM - 12:30 PM", subject: "Database Management Systems", code: "CS301", room: "Room 204", teacher: "Dr. Sunita Rao", type: "Lecture", color: "indigo" },
    { time: "02:00 PM - 03:30 PM", subject: "Library & Self Research", code: "LIB10", room: "Central Library", teacher: "Dr. K. Raman", type: "Self Study", color: "slate" }
  ],
  Thursday: [
    { time: "09:00 AM - 10:00 AM", subject: "Software Engineering", code: "CS305", room: "Room 105", teacher: "Dr. Meenakshi D.", type: "Lecture", color: "purple" },
    { time: "10:00 AM - 11:00 AM", subject: "Digital Logic Design", code: "CS302", room: "Room 301", teacher: "Prof. K. Verma", type: "Lecture", color: "cyan" },
    { time: "11:30 AM - 01:00 PM", subject: "Networks & Security Lab", code: "CS304L", room: "Network Lab 1", teacher: "Prof. Amit Patel", type: "Lab", color: "amber" },
    { time: "02:30 PM - 04:00 PM", subject: "Mini Project Mentorship", code: "PROJ3", room: "Incubation Center", teacher: "Dr. Ananya Sen", type: "Project", color: "emerald" }
  ],
  Friday: [
    { time: "09:00 AM - 10:00 AM", subject: "Database Management Systems", code: "CS301", room: "Room 204", teacher: "Dr. Sunita Rao", type: "Lecture", color: "indigo" },
    { time: "10:00 AM - 11:00 AM", subject: "Computer Networks", code: "CS304", room: "Room 204", teacher: "Prof. Amit Patel", type: "Lecture", color: "amber" },
    { time: "11:30 AM - 12:30 PM", subject: "Digital Logic Design", code: "CS302", room: "Room 301", teacher: "Prof. K. Verma", type: "Tutorial", color: "cyan" },
    { time: "02:00 PM - 03:00 PM", subject: "Placement & Aptitude Prep", code: "TPO1", room: "Auditorium 2", teacher: "Career Cell", type: "Workshop", color: "rose" }
  ],
  Saturday: [
    { time: "09:30 AM - 11:30 AM", subject: "Coding Club & Hackathon Lab", code: "CLUB", room: "Seminar Hall", teacher: "Tech Council", type: "Extracurricular", color: "indigo" },
    { time: "11:45 AM - 01:00 PM", subject: "Open Source Contribution Clinic", code: "OSC", room: "Lab 3", teacher: "Dr. Ananya Sen", type: "Workshop", color: "emerald" }
  ]
};

export const attendanceData = {
  overallPercentage: 82,
  presentCount: 76,
  absentCount: 12,
  totalClasses: 88,
  minRequired: 75,
  subjects: [
    { code: "CS301", name: "Database Management Systems", total: 24, present: 21, absent: 3, percentage: 87.5, status: "Safe" },
    { code: "CS302", name: "Digital Logic Design", total: 20, present: 17, absent: 3, percentage: 85.0, status: "Safe" },
    { code: "CS303L", name: "Python Programming Lab", total: 16, present: 15, absent: 1, percentage: 93.8, status: "Safe" },
    { code: "CS304", name: "Computer Networks", total: 18, present: 13, absent: 5, percentage: 72.2, status: "Warning" },
    { code: "CS305", name: "Software Engineering", total: 10, present: 10, absent: 0, percentage: 100.0, status: "Safe" }
  ]
};

export const initialRequests = [
  {
    id: "LR-2041",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Leave Application",
    type: "Medical Leave",
    date: "18 Sep 2026",
    fromDate: "2026-09-18",
    toDate: "2026-09-20",
    duration: "3 days",
    reason: "Severe viral fever and medical observation as advised by doctor.",
    attachment: "doctor_prescription.pdf",
    priority: "High",
    status: "Pending",
    lastUpdated: "Today, 10:15 AM",
    assignedTo: "Academic Warden",
    department: "Computer Science",
    adminComment: "Under review by Warden office."
  },
  {
    id: "GP-1024",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Gate Pass",
    destination: "Care Hospital, City Center",
    reason: "Routine medical dental checkup and prescription renewal",
    leavingDate: "2026-09-17",
    leavingTime: "04:30 PM",
    returnTime: "08:30 PM",
    emergencyContact: "+91 98765 11223",
    priority: "Normal",
    status: "Approved",
    date: "17 Sep 2026",
    lastUpdated: "Yesterday, 03:45 PM",
    assignedTo: "Hostel Warden",
    department: "Hostel Admin",
    qrCodeString: "CAMPUSCONNECT-GP1024-APPROVED-20260917",
    adminComment: "Approved. Please report back before 08:30 PM curfew."
  },
  {
    id: "CR-804",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Certificate Request",
    certificateType: "Bonafide Certificate",
    purpose: "State Bank of India Education Loan disbursement application",
    requiredDate: "2026-09-25",
    additionalInfo: "Required with seal of Academic Registrar.",
    priority: "Normal",
    status: "Processing",
    currentStep: 2, // 1: Submitted, 2: Processing, 3: Ready, 4: Downloaded
    date: "15 Sep 2026",
    lastUpdated: "2 days ago",
    assignedTo: "Registrar Office",
    department: "Academics",
    adminComment: "Verification done. Pending Registrar stamp."
  },
  {
    id: "HC-102",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Hostel Complaint",
    category: "Wi-Fi",
    hostel: "Block C",
    room: "C-304",
    priority: "High",
    status: "In Progress",
    description: "Wi-Fi router on 3rd floor Block C drops speed frequently below 1 Mbps and disconnects.",
    assignedStaff: "Karan S. (Network Team)",
    date: "16 Sep 2026",
    lastUpdated: "1 day ago",
    department: "IT Infrastructure",
    adminComment: "Access point restart scheduled with technician."
  },
  {
    id: "CR-772",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Certificate Request",
    certificateType: "Internship NOC Certificate",
    purpose: "Summer Software Engineering Internship at Microsoft IDC",
    requiredDate: "2026-09-12",
    priority: "High",
    status: "Approved",
    currentStep: 3, // Ready
    date: "10 Sep 2026",
    lastUpdated: "12 Sep 2026",
    assignedTo: "Training & Placement Cell",
    department: "Placement",
    adminComment: "Generated and approved. Ready for download.",
    downloadable: true
  },
  {
    id: "MC-401",
    studentName: "Akash Mahakud",
    studentId: "CS-2023-0842",
    requestType: "Mess Complaint",
    category: "Food Quality",
    meal: "Wednesday Dinner",
    priority: "Medium",
    status: "In Progress",
    description: "Rice was undercooked and soup was cold during Wednesday 8:30 PM dinner service.",
    date: "17 Sep 2026",
    lastUpdated: "Yesterday",
    assignedTo: "Mess Supervisor",
    department: "Hostel & Mess Committee",
    adminComment: "Catering manager warned. Kitchen inspection booked for Thursday."
  },
  // Extra requests from other students for Admin Portal realism
  {
    id: "LR-2042",
    studentName: "Sneha Roy",
    studentId: "CS-2023-0811",
    requestType: "Leave Application",
    type: "Personal Leave",
    date: "19 Sep 2026",
    fromDate: "2026-09-21",
    toDate: "2026-09-23",
    duration: "2 days",
    reason: "Attending sister's wedding ceremony.",
    attachment: "invitation.pdf",
    priority: "Normal",
    status: "Pending",
    lastUpdated: "Today, 09:30 AM",
    assignedTo: "HOD CSE",
    department: "Computer Science",
    adminComment: "Awaiting parent verification call."
  },
  {
    id: "GP-1025",
    studentName: "Vikram Malhotra",
    studentId: "ME-2023-0402",
    requestType: "Gate Pass",
    destination: "City Railway Station",
    reason: "Receiving grandmother arriving from hometown",
    leavingDate: "2026-09-20",
    leavingTime: "06:00 PM",
    returnTime: "09:30 PM",
    emergencyContact: "+91 94380 44556",
    priority: "High",
    status: "Pending",
    date: "20 Sep 2026",
    lastUpdated: "Today, 11:20 AM",
    assignedTo: "Hostel Warden",
    department: "Hostel Admin",
    adminComment: ""
  },
  {
    id: "HC-105",
    studentName: "Rohan Varma",
    studentId: "CS-2023-0855",
    requestType: "Hostel Complaint",
    category: "Plumbing",
    hostel: "Block C",
    room: "C-304",
    priority: "Medium",
    status: "Pending",
    description: "Bathroom sink faucet has a steady leak and low water pressure in the morning.",
    assignedStaff: "Unassigned",
    date: "19 Sep 2026",
    lastUpdated: "Yesterday, 04:00 PM",
    department: "Estate & Maintenance",
    adminComment: ""
  },
  {
    id: "CR-806",
    studentName: "Ananya Deshmukh",
    studentId: "EC-2023-0219",
    requestType: "Certificate Request",
    certificateType: "Course Completion Certificate",
    purpose: "Higher education foreign visa application",
    requiredDate: "2026-09-28",
    priority: "High",
    status: "Pending",
    currentStep: 1,
    date: "19 Sep 2026",
    lastUpdated: "Yesterday",
    assignedTo: "Dean Academics",
    department: "Academics",
    adminComment: ""
  }
];

export const messMenu = {
  today: {
    day: "Wednesday",
    date: "20 Sep 2026",
    breakfast: {
      items: ["Steamed Idli with Sambar", "Fresh Coconut Chutney", "Poha with Roasted Peanuts", "Hard Boiled Eggs / Banana", "Hot Filter Coffee & Tea"],
      timing: "07:30 AM - 09:30 AM",
      calories: "450 kcal"
    },
    lunch: {
      items: ["Paneer Butter Masala (Veg)", "Kadhai Chicken (Non-Veg)", "Dal Tadka", "Jeera Rice & Tandoori Roti", "Fresh Cucumber Tomato Salad", "Hot Gulab Jamun"],
      timing: "12:30 PM - 02:30 PM",
      calories: "780 kcal"
    },
    snacks: {
      items: ["Crispy Veg Cutlet with Mint Dip", "Masala Chai & Green Tea", "Bourbon & Butter Biscuits"],
      timing: "05:00 PM - 06:15 PM",
      calories: "280 kcal"
    },
    dinner: {
      items: ["Special Veg Biryani / Egg Biryani", "Mirchi Ka Salan & Mixed Raita", "Mix Veg Korma", "Phulkas with Ghee", "Fresh Seasonal Fruit Bowl"],
      timing: "08:00 PM - 10:00 PM",
      calories: "710 kcal"
    }
  }
};

export const initialNotices = [
  {
    id: "NOT-101",
    title: "Mid-Term Examination Schedule - Autumn Semester 2026",
    category: "Examination",
    date: "19 Sep 2026",
    priority: "High",
    targetAudience: "All Students",
    author: "Controller of Examinations",
    description: "The Mid-Term Examinations for all B.Tech and M.Tech programs will officially commence from October 5th, 2026. Hall tickets will be issued digitally through CampusConnect. Students are advised to clear outstanding dues before September 30th to avoid exam hold.",
    attachmentName: "MidTerm_Exam_Schedule_Autumn2026.pdf",
    readCount: 1420
  },
  {
    id: "NOT-102",
    title: "Annual Techfest 'Innovate 2026' 36-Hour Hackathon Registrations Open",
    category: "Events",
    date: "18 Sep 2026",
    priority: "Normal",
    targetAudience: "All Students",
    author: "Technical Council",
    description: "Calling all developers, designers, and innovators! Registrations are now live for Innovate 2026 Hackathon featuring prizes worth ₹5,00,000. Tracks include AI & Autonomous Agents, Climate Tech, FinTech, and Smart Campus Systems. Teams of 2 to 4 members are eligible.",
    attachmentName: "Innovate2026_Rulebook.pdf",
    readCount: 980
  },
  {
    id: "NOT-103",
    title: "Campus Placement Drive: Tier-1 Tech Companies Pre-Placement Talks",
    category: "Placement",
    date: "17 Sep 2026",
    priority: "High",
    targetAudience: "3rd & 4th Year",
    author: "Training & Placement Cell",
    description: "Pre-placement talks and online aptitude screening for Microsoft, Google Cloud, and Amazon will be conducted on September 24th in the Main Auditorium and Virtual Lab 1. Eligible students must keep their verified resume updated on the portal.",
    attachmentName: "Placement_Drive_Eligibility_Criteria.pdf",
    readCount: 1850
  },
  {
    id: "NOT-104",
    title: "Hostel Maintenance & High-Speed Optical Wi-Fi Upgradation Schedule",
    category: "Hostel",
    date: "16 Sep 2026",
    priority: "Normal",
    targetAudience: "Hostel Students",
    author: "Chief Warden Office",
    description: "Scheduled maintenance of optical fiber lines and Wi-Fi access points across Blocks A, B, and C will occur this Saturday between 10:00 AM and 02:00 PM. Power backup generators will be tested concurrently. Please plan academic tasks accordingly.",
    attachmentName: "Maintenance_Roster_Sep2026.pdf",
    readCount: 650
  },
  {
    id: "NOT-105",
    title: "Important: Last Date for Odd Semester Tuition Fee Payment Without Fine",
    category: "Fees",
    date: "15 Sep 2026",
    priority: "High",
    targetAudience: "All Students",
    author: "Finance & Accounts Section",
    description: "Students who have not completed the second installment of semester tuition fees are reminded that September 30, 2026 is the final deadline to avoid a ₹1,000 late fine. Online payment receipts can be downloaded instantly via the Fees section.",
    attachmentName: "Fee_Structure_Circular_2026.pdf",
    readCount: 2200
  },
  {
    id: "NOT-106",
    title: "Distinguished Guest Lecture: Building Multi-Agent Systems in Practice",
    category: "Academic",
    date: "14 Sep 2026",
    priority: "Normal",
    targetAudience: "Specific Department",
    department: "Computer Science & Engineering",
    author: "Department of CSE",
    description: "Prof. Dr. David Miller from Deep Learning Labs will deliver a special interactive session on 'Autonomous Agents and LLM Orchestration' this Friday at 04:00 PM in Seminar Hall 1. Attendance is recommended for CSE and IT 3rd/4th year students.",
    attachmentName: "GuestLecture_Abstract.pdf",
    readCount: 740
  }
];

export const feeData = {
  totalFee: 140000,
  paidAmount: 105000,
  remainingAmount: 35000,
  nextDueDate: "15 Oct 2026",
  currency: "₹",
  transactions: [
    {
      id: "TXN-2026-9810",
      date: "10 Jul 2026",
      description: "Academic Tuition Fee - 5th Semester (Installment 1)",
      amount: 70000,
      mode: "Net Banking (SBI)",
      status: "Paid",
      receiptId: "REC-2026-0842-1"
    },
    {
      id: "TXN-2026-9811",
      date: "12 Jul 2026",
      description: "Hostel Accommodation & Mess Advance (Autumn)",
      amount: 35000,
      mode: "UPI (Google Pay)",
      status: "Paid",
      receiptId: "REC-2026-0842-2"
    },
    {
      id: "TXN-2026-9942",
      date: "Due 15 Oct 2026",
      description: "Academic Tuition Fee - 6th Semester (Installment 2)",
      amount: 35000,
      mode: "Pending Payment",
      status: "Pending",
      receiptId: null
    }
  ]
};

export const initialNotifications = [
  {
    id: "NOTIF-1",
    title: "Gate Pass Approved",
    message: "Your gate-pass request #GP-1024 for Care Hospital has been approved by the Warden.",
    category: "Requests",
    time: "Yesterday, 03:45 PM",
    unread: false,
    type: "success"
  },
  {
    id: "NOTIF-2",
    title: "Leave Application Received",
    message: "Your medical leave request #LR-2041 is waiting for department warden approval.",
    category: "Requests",
    time: "Today, 10:15 AM",
    unread: true,
    type: "info"
  },
  {
    id: "NOTIF-3",
    title: "New Examination Notice",
    message: "Mid-Term Examination Schedule - Autumn Semester 2026 has been published.",
    category: "Academic",
    time: "Today, 08:30 AM",
    unread: true,
    type: "warning"
  },
  {
    id: "NOTIF-4",
    title: "Hostel Complaint Assigned",
    message: "Wi-Fi complaint #HC-102 assigned to Network Team (Karan S.). Technician visiting today.",
    category: "Hostel",
    time: "1 day ago",
    unread: true,
    type: "info"
  },
  {
    id: "NOTIF-5",
    title: "Certificate Ready for Download",
    message: "Your Internship NOC Certificate #CR-772 is approved and ready for PDF download.",
    category: "Requests",
    time: "2 days ago",
    unread: false,
    type: "success"
  },
  {
    id: "NOTIF-6",
    title: "Fee Reminder",
    message: "Upcoming fee balance ₹35,000 is due on October 15, 2026. Pay early to avoid late fees.",
    category: "Fees",
    time: "3 days ago",
    unread: false,
    type: "warning"
  },
  {
    id: "NOTIF-7",
    title: "Mess Committee Update",
    message: "Special Wednesday Dinner Menu: Biryani and Gulab Jamun served tonight!",
    category: "Mess",
    time: "4 hours ago",
    unread: true,
    type: "info"
  }
];
