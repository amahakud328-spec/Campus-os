import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialStudentProfile,
  initialAdminProfile,
  initialRequests,
  initialNotices,
  initialNotifications,
  feeData
} from '../data/mockData';

const CampusContext = createContext(null);

export const CampusProvider = ({ children }) => {
  // Current logged in role: 'student' or 'admin'
  const [currentUserRole, setCurrentUserRole] = useState(() => {
    return localStorage.getItem('cc_role') || 'student';
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('cc_student_profile');
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('cc_admin_profile');
    return saved ? JSON.parse(saved) : initialAdminProfile;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('cc_requests');
    return saved ? JSON.parse(saved) : initialRequests;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('cc_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cc_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [toasts, setToasts] = useState([]);
  const [messRatings, setMessRatings] = useState([
    { id: 1, user: "Akash Mahakud", rating: 5, meal: "Lunch", comment: "Paneer Butter Masala was delicious today!", date: "Today, 01:15 PM" },
    { id: 2, user: "Rohan Varma", rating: 4, meal: "Breakfast", comment: "Sambar was flavorful, idlis soft.", date: "Today, 08:45 AM" }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cc_role', currentUserRole);
  }, [currentUserRole]);

  useEffect(() => {
    localStorage.setItem('cc_student_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    localStorage.setItem('cc_admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  useEffect(() => {
    localStorage.setItem('cc_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('cc_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('cc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast dispatch
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Add a new student service request (Leave, Gate Pass, Certificate, Complaint)
  const addRequest = (newReq) => {
    const createdReq = {
      ...newReq,
      id: newReq.id || `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: newReq.date || 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastUpdated: 'Just now',
      studentName: studentProfile.name,
      studentId: studentProfile.studentId,
      status: newReq.status || 'Pending'
    };

    setRequests((prev) => [createdReq, ...prev]);

    // Push notification
    addNotification({
      title: `New Request Submitted: ${createdReq.requestType}`,
      message: `Your ${createdReq.requestType} (#${createdReq.id}) has been submitted and is pending review.`,
      category: 'Requests',
      type: 'info'
    });

    showToast(`${createdReq.requestType} submitted successfully!`);
    return createdReq;
  };

  // Admin update request status (Approve, Reject, Resolve, etc.)
  const updateRequestStatus = (id, newStatus, adminComment = '') => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updated = {
            ...req,
            status: newStatus,
            lastUpdated: 'Just now',
            adminComment: adminComment || req.adminComment || `Status updated to ${newStatus}`
          };
          if (newStatus === 'Approved' && req.requestType === 'Certificate Request') {
            updated.currentStep = 3;
            updated.downloadable = true;
          }
          return updated;
        }
        return req;
      })
    );

    // Push notification to student
    addNotification({
      title: `Request ${newStatus}: #${id}`,
      message: `Your request #${id} status has been updated to "${newStatus}" by Administration.`,
      category: 'Requests',
      type: newStatus === 'Approved' || newStatus === 'Resolved' ? 'success' : newStatus === 'Rejected' ? 'error' : 'info'
    });

    if (newStatus === 'Approved' || newStatus === 'Resolved') {
      triggerConfetti();
      showToast(`Request #${id} marked as ${newStatus}!`, 'success');
    } else {
      showToast(`Request #${id} status updated to ${newStatus}`, 'info');
    }
  };

  // Add notification
  const addNotification = (item) => {
    const notif = {
      id: `NOTIF-${Date.now()}`,
      time: 'Just now',
      unread: true,
      ...item
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // Mark single notification read
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  // Mark all notifications read
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'info');
  };

  // Publish a new notice
  const addNotice = (newNotice) => {
    const created = {
      ...newNotice,
      id: `NOT-${Math.floor(200 + Math.random() * 800)}`,
      date: 'Today, ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      readCount: 1
    };
    setNotices((prev) => [created, ...prev]);
    addNotification({
      title: `New Notice: ${created.title}`,
      message: `New notice published for ${created.targetAudience || 'All Students'}.`,
      category: 'Academic',
      type: created.priority === 'High' ? 'warning' : 'info'
    });
    showToast('Notice published successfully!', 'success');
    return created;
  };

  // Delete notice
  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    showToast('Notice removed', 'info');
  };

  // Add mess rating
  const addMessRating = (rating, meal, comment) => {
    const review = {
      id: Date.now(),
      user: studentProfile.name,
      rating,
      meal,
      comment,
      date: 'Just now'
    };
    setMessRatings((prev) => [review, ...prev]);
    showToast('Thank you! Your meal rating has been recorded.', 'success');
  };

  // Reset to default demo data
  const resetDemoData = () => {
    setStudentProfile(initialStudentProfile);
    setAdminProfile(initialAdminProfile);
    setRequests(initialRequests);
    setNotices(initialNotices);
    setNotifications(initialNotifications);
    localStorage.clear();
    showToast('Demo data reset to initial defaults', 'info');
  };

  return (
    <CampusContext.Provider
      value={{
        currentUserRole,
        setCurrentUserRole,
        studentProfile,
        setStudentProfile,
        adminProfile,
        setAdminProfile,
        requests,
        addRequest,
        updateRequestStatus,
        notices,
        addNotice,
        deleteNotice,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        showToast,
        removeToast,
        triggerConfetti,
        messRatings,
        addMessRating,
        resetDemoData,
        feeData
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
