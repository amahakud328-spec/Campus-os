import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CampusProvider } from './context/CampusContext';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AttendancePage from './pages/student/AttendancePage';
import TimetablePage from './pages/student/TimetablePage';
import LeavePage from './pages/student/LeavePage';
import GatePassPage from './pages/student/GatePassPage';
import CertificatePage from './pages/student/CertificatePage';
import HostelPage from './pages/student/HostelPage';
import MessPage from './pages/student/MessPage';
import NoticesPage from './pages/student/NoticesPage';
import FeesPage from './pages/student/FeesPage';
import NotificationsPage from './pages/student/NotificationsPage';
import ProfilePage from './pages/student/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import RequestManagementPage from './pages/admin/RequestManagementPage';
import StudentsDirectoryPage from './pages/admin/StudentsDirectoryPage';
import LeaveAdminPage from './pages/admin/LeaveAdminPage';
import GatePassAdminPage from './pages/admin/GatePassAdminPage';
import HostelAdminPage from './pages/admin/HostelAdminPage';
import MessAdminPage from './pages/admin/MessAdminPage';
import CertificateAdminPage from './pages/admin/CertificateAdminPage';
import NoticeAdminPage from './pages/admin/NoticeAdminPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';

export function App() {
  return (
    <CampusProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Student Portal Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="leave" element={<LeavePage />} />
            <Route path="gatepass" element={<GatePassPage />} />
            <Route path="certificates" element={<CertificatePage />} />
            <Route path="hostel" element={<HostelPage />} />
            <Route path="mess" element={<MessPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Administrator Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="requests" element={<RequestManagementPage />} />
            <Route path="students" element={<StudentsDirectoryPage />} />
            <Route path="leave" element={<LeaveAdminPage />} />
            <Route path="gatepass" element={<GatePassAdminPage />} />
            <Route path="certificates" element={<CertificateAdminPage />} />
            <Route path="hostel" element={<HostelAdminPage />} />
            <Route path="mess" element={<MessAdminPage />} />
            <Route path="notices" element={<NoticeAdminPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CampusProvider>
  );
}

export default App;
