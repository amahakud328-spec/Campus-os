Ak project
# CampusConnect – Smart College Service Management Platform


> **A modern, responsive, all-in-one digital campus ecosystem connecting students, faculty wardens, and university administrators.**

---

## 🚀 Live Development Server

Your CampusConnect frontend application is currently running live on:

- **Local URL**: [http://localhost:5173/](http://localhost:5173/)
- **Network / Mobile Testing**: `http://<your-local-ip>:5173/` (e.g. `http://172.16.10.156:5173/`)

To start or restart the server at any time:
```bash
npm run dev
```

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🎯 Problem Statement & Solution

### The Problem
College students currently face significant fragmentation when managing campus life:
- Standing in long physical queues at the Registrar or Warden office for bonafide certificates and gate passes.
- Submitting handwritten paper applications for medical or emergency leaves.
- Scrolling through unorganized WhatsApp groups for exam circulars and timetable changes.
- Struggling to report hostel maintenance issues (broken taps, faulty Wi-Fi routers) or mess food quality grievances.
- Administrative departments have zero real-time visibility into student bottlenecks, leading to 4–5 day approval delays.

### The Solution: CampusConnect
CampusConnect brings all student services, approvals, notices, and grievances into a single digital platform:
- **Instant Digital Requests**: 8 service categories with file uploads and timeline tracking.
- **Warden & Dean Console**: Centralized approval queue with automated department routing and 18-hour turnaround.
- **Real-Time Cross-Portal State**: Applications submitted by a student appear immediately in the admin portal for approval, instantly updating the student's status with celebratory confetti!
- **Hackathon Demo Switcher**: A persistent top navigation bar allowing judges and presenters to toggle between **Student View (Akash Mahakud)** and **Admin View (Dr. Rajesh Sharma)** with one click.

---

## 🌟 Architecture & Key Features

### 1. Landing Page (`/`)
- **Hero Section**: Modern dashboard mockup with live connection indicators and service request streams.
- **8 Core Services Suite**: Attendance, Leave Management, Gate Pass, Certificates, Hostel Support, Mess Services, Campus Notices, and Fee Portal.
- **Workflow Stepper**: 4 clear steps from authentication to digital resolution.
- **Smarter Administration**: Showcasing institutional analytics, reduced turnaround times, and audit logs.
- **Call to Action**: High-conversion access to student and admin portals.

### 2. Split-Screen Authentication (`/login`)
- **Left Branding Panel**: Deep indigo aesthetic with feature highlights.
- **Right Login Card**: Student and Administrator role tabs, pre-filled credentials, and **1-Click Hackathon Fast Demo Access**.

### 3. Student Portal (`/student/*`) — 12 Dedicated Pages
| Route | Page | Description |
|---|---|---|
| `/student/dashboard` | **Dashboard Overview** | Good Morning Akash 👋, SVG circular attendance gauge (82%), today's classes (4), pending requests (3), timetable timeline, 6 quick actions, and my requests table with view modal. |
| `/student/attendance` | **Attendance Analytics** | Detailed 82% rate, 75% cutoff shortfall warning alert, Recharts weekly area graph with target line, subject progress bars. |
| `/student/timetable` | **Class Timetable** | Full Monday–Saturday schedule, room numbers, faculty names, course codes, *"Today"* highlighted, day/week view toggles. |
| `/student/leave` | **Leave Management** | Medical, Personal, and Emergency leave form with automatic day calculation, file attachment simulator, and past leave table. |
| `/student/gatepass` | **Digital Gate Pass** | Campus exit pass request form, 3-step timeline tracker, and **Scannable Security Gate QR Modal** with curfew warnings. |
| `/student/certificates` | **Certificate Request** | Bonafide, Character, and NOC certificate applications, 3-step stepper, and **Printable Official E-Certificate Modal** with seal and cryptographic hash. |
| `/student/hostel` | **Hostel Services** | Room C-304 & roommate details, warden direct contact, and hostel maintenance ticket filing with technician dispatch tracking. |
| `/student/mess` | **Mess & Dining** | Daily 4-meal menu with calories, interactive 5-star meal rating widget with student reviews, and food hygiene grievance form. |
| `/student/notices` | **Notice Board** | Category filter pills (*All, Important, Academic, Exam, Events, Placement, Hostel, Fees*), search bar, priority tags, and **Notice Reader Modal**. |
| `/student/fees` | **Fee Portal** | Total fee, paid amount, remaining due, fee progress bar, transaction history ledger, and **Printable Official Fee Receipt Modal** + query form. |
| `/student/notifications`| **Notification Center**| Categorized real-time alerts with unread badges and *"Mark all as read"*. |
| `/student/profile` | **Student Profile** | Student identity, CGPA (8.84), academic mentor, and modals to update contact info or change password. |

### 4. Administrator Console (`/admin/*`) — 11 Dedicated Pages
| Route | Page | Description |
|---|---|---|
| `/admin/dashboard` | **Command Dashboard** | 5 KPI stat cards with trend indicators (*Total Students: 5,240, Pending: 128, Open Complaints: 42, Resolved: 67, Turnaround: 18h*), Recharts weekly volume chart, and urgent priority action queue. |
| `/admin/requests` | **Central Request Desk** | Master table with multi-filtering by status and service type, search, and an **Application Review Modal** with department routing and Approve / Reject / Forward / Mark Resolved actions. |
| `/admin/leave` | **Leave Approvals** | Summary metrics and student leave table with one-click approvals. |
| `/admin/gatepass` | **Gate Pass Authorizations**| Outing approvals, return curfews, and emergency pass verification. |
| `/admin/hostel` | **Hostel Complaints** | Maintenance ticket cards, staff assignment input, and a 4-step resolution timeline (*Reported → Assigned → In Progress → Resolved*). |
| `/admin/mess` | **Mess Analytics** | Recharts bar chart for complaint categories and line chart for weekly rating trends. |
| `/admin/certificates` | **Certificate Desk** | Verification workflow with instant digital seal approval. |
| `/admin/notices` | **Notice Management** | Create and publish circulars targeted to specific student groups with instant synchronization to student notice boards. |
| `/admin/analytics` | **Analytics & Insights** | 18.2h resolution comparison (-25% faster), Recharts donut chart for category share, department turnaround bar chart, and **Top 5 Frequently Occurring Campus Problems** ranking. |
| `/admin/students` | **Student Roster** | Master directory searchable by roll ID, department, and academic status. |
| `/admin/profile` | **Admin Profile** | Dr. Rajesh Sharma's credentials, RSA-4096 signing key status, consultation hours, and privileges. |

---

## 🎭 Step-by-Step Hackathon Demo Script

For the best impression during an evaluation or hackathon pitch:

1. **Start on the Landing Page ([http://localhost:5173/](http://localhost:5173/))**:
   - Show the modern hero preview mockup, 8 service cards, and administrative value proposition.
2. **Login as Student Akash**:
   - Click **"Student Login"** or use the top demo bar to switch to **Student View**.
   - Review the dashboard: 82% circular attendance gauge, today's 4 lectures, and current requests.
3. **Submit a New Request**:
   - Navigate to **Gate Pass** or **Leave Application**.
   - Fill out a request (e.g. Hospital visit) and click **Submit**.
   - Notice the instant success toast, addition to the requests table, and unread notification.
4. **Switch to Administrator View with 1 Click**:
   - In the top demo bar, click **"Admin View"**.
   - You are now Dr. Rajesh Sharma! Navigate to **Central Requests** or **Gate Pass Requests**.
   - The request you just submitted in the Student View is immediately visible in the **Pending Queue**!
5. **Approve the Application**:
   - Click **"Review"** or **"Approve"**. Add an administrative remark and click **Approve Request**.
   - A celebration confetti burst appears, confirming the action.
6. **Switch Back to Student View**:
   - Click **"Student View"** in the top bar.
   - Go to **Gate Pass** — the pass status is now **"Approved"**!
   - Click **"Show Gate QR"** to reveal the security gate pass with scannable QR code!
7. **Demonstrate Certificates**:
   - Go to **Certificate Request** and click **"Download Certificate"** on the ready certificate to show the official e-certificate complete with college seal and Registrar signature.

---

## 🛠️ Tech Stack & Directory Structure

```
c:/hackathon_p/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── DemoBar.jsx          # Hackathon role switcher banner
│   │   │   ├── Modal.jsx            # Accessible dialog component
│   │   │   ├── Navbar.jsx           # Topbar with notifications & search
│   │   │   ├── Sidebar.jsx          # Responsive navigation drawer
│   │   │   ├── StatCard.jsx         # Metric card with trends
│   │   │   ├── StatusBadge.jsx      # Color-coded status pills
│   │   │   └── Toast.jsx            # Toast alert notification container
│   │   └── ui/
│   │       ├── CircularProgress.jsx # SVG circular gauge
│   │       ├── RatingStars.jsx      # Interactive 5-star rater
│   │       └── Timeline.jsx         # Multi-step progress tracker
│   ├── context/
│   │   └── CampusContext.jsx        # Synchronized state with localStorage
│   ├── data/
│   │   ├── mockData.js              # Comprehensive demo dataset
│   │   └── analyticsData.js         # Recharts graph datasets
│   ├── layouts/
│   │   ├── StudentLayout.jsx        # Student portal shell
│   │   └── AdminLayout.jsx          # Admin portal shell
│   ├── pages/
│   │   ├── LandingPage.jsx          # Public landing showcase
│   │   ├── LoginPage.jsx            # Split-screen role login
│   │   ├── student/                 # 12 Student pages
│   │   └── admin/                   # 11 Administrator pages
│   ├── App.jsx                      # Route definitions
│   ├── index.css                    # Tailwind CSS base styles
│   └── main.jsx                     # Application entry point
├── package.json
└── vite.config.js
```

---

## 📄 License
Created for College Hackathon Demonstration. Built with ❤️ for students and administrators.
