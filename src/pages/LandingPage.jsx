import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  CalendarCheck,
  FileText,
  KeyRound,
  Award,
  Building2,
  UtensilsCrossed,
  BellRing,
  CreditCard,
  CheckCircle2,
  Clock,
  BarChart3,
  Users,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react';
import DemoBar from '../components/common/DemoBar';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CalendarCheck,
      title: "Attendance Tracker",
      description: "Subject-wise attendance, percentage tracking, and instant low-attendance alert triggers.",
      color: "indigo"
    },
    {
      icon: FileText,
      title: "Leave Management",
      description: "Apply for medical, personal, or emergency leave with documents; get instant approvals.",
      color: "blue"
    },
    {
      icon: KeyRound,
      title: "Digital Gate Pass",
      description: "Generate digital QR gate passes with warden authorization and scheduled return timestamps.",
      color: "cyan"
    },
    {
      icon: Award,
      title: "Certificate Requests",
      description: "Order Bonafide, NOC, and Character certificates with digital generation & tracking.",
      color: "emerald"
    },
    {
      icon: Building2,
      title: "Hostel Support",
      description: "Report electrical, Wi-Fi, and plumbing maintenance issues with live technician dispatch.",
      color: "amber"
    },
    {
      icon: UtensilsCrossed,
      title: "Mess Services",
      description: "Daily 4-meal live menu, meal quality ratings, hygiene complaints, and nutrition logs.",
      color: "rose"
    },
    {
      icon: BellRing,
      title: "Campus Notices",
      description: "Centralized verified notice board segmented by department, year, and urgency.",
      color: "purple"
    },
    {
      icon: CreditCard,
      title: "Fee Portal",
      description: "Semester fee breakdowns, payment receipts, due reminders, and direct dispute queries.",
      color: "teal"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "One-Click Login",
      description: "Log in with your institutional Student ID or Administrative portal credentials."
    },
    {
      num: "02",
      title: "Submit Any Request",
      description: "Select from 8+ student services and submit digital applications with attachments."
    },
    {
      num: "03",
      title: "Track Live Progress",
      description: "Watch requests move through verification, warden approval, and administrative sign-off."
    },
    {
      num: "04",
      title: "Instant Resolution",
      description: "Receive instant notifications, downloadable passes, and digitally signed certificates."
    }
  ];

  const adminBenefits = [
    {
      icon: Zap,
      title: "Centralized Request Hub",
      desc: "Consolidate thousands of paper forms and scattered WhatsApp messages into one prioritized queue."
    },
    {
      icon: Clock,
      title: "Faster Issue Turnaround",
      desc: "Cut response latency from 4-5 days to under 18 hours with automated department routing."
    },
    {
      icon: BarChart3,
      title: "Campus-Wide Analytics",
      desc: "Spot recurring facility issues, peak gate-pass volumes, and hostel maintenance hotspots."
    },
    {
      icon: BellRing,
      title: "Targeted Notice Broadcasts",
      desc: "Publish notices selectively to specific batches, hostel blocks, or the entire student body."
    },
    {
      icon: ShieldCheck,
      title: "Audit Trail & Accountability",
      desc: "Every approval, warden sign-off, and security gate log is timestamped and tamper-proof."
    },
    {
      icon: Users,
      title: "Staff Workload Distribution",
      desc: "Assign incoming maintenance tasks and certificate verifications to relevant department officers."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Demo Switcher Bar */}
      <DemoBar />

      {/* Top Navigation */}
      <header className="sticky top-[33px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                Campus<span className="text-indigo-600">Connect</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Smart College Ecosystem
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login?role=student')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-xl transition-all"
            >
              Student Portal
            </button>
            <button
              onClick={() => navigate('/login?role=admin')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-xl transition-all hidden sm:block"
            >
              Admin Portal
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Background gradient blur effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/50 via-cyan-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Next-Generation College Service Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            One Campus. Every Service.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
              One Simple Platform.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            CampusConnect brings student services, requests, complaints, notices and administrative
            workflows together in one powerful digital platform.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login?role=student')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Student Login</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate('/login?role=admin')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-md shadow-slate-200/60 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Administrator Login</span>
            </button>
          </div>

          {/* Interactive Hero Visual Mockup Preview */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-5 shadow-2xl shadow-indigo-500/10">
              {/* Mockup Browser Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 px-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2">campusconnect.edu/dashboard</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ● Live Connected
                </span>
              </div>

              {/* Mockup Inside Grid */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                {/* Metric 1 */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    82%
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Overall Attendance</p>
                    <p className="text-sm font-bold text-slate-900">76 / 88 Classes</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Today's Lectures</p>
                    <p className="text-sm font-bold text-slate-900">Next: DBMS @ 09 AM</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Active Requests</p>
                    <p className="text-sm font-bold text-slate-900">1 Pass • 1 Leave</p>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    18h
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Avg Resolution</p>
                    <p className="text-sm font-bold text-slate-900">25% Faster Turnaround</p>
                  </div>
                </div>

                {/* Main Preview Table Preview */}
                <div className="md:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Student Service Requests Stream
                    </span>
                    <span className="text-xs text-indigo-600 font-semibold cursor-pointer" onClick={() => navigate('/student/dashboard')}>
                      Explore Full Dashboard →
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <div>
                          <p className="font-semibold text-slate-900">Medical Leave Request #LR-2041</p>
                          <p className="text-slate-400 text-[11px]">Submitted Today, 10:15 AM • 3 Days Duration</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                        Pending Review
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div>
                          <p className="font-semibold text-slate-900">City Hospital Gate Pass #GP-1024</p>
                          <p className="text-slate-400 text-[11px]">Approved by Warden • Valid until 08:30 PM</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        Approved (QR Ready)
                      </span>
                    </div>

                    <div className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="font-semibold text-slate-900">Bonafide Certificate #CR-804</p>
                          <p className="text-slate-400 text-[11px]">SBI Loan Verification • Registrar Desk</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                        Processing (Step 2/4)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Everything students need, in one place.
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              No more bouncing between hostel wardens, department offices, library counters, and mess
              committees. All campus workflows are unified digitally.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-100 shadow-xs hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Simple Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              How CampusConnect Works
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Four streamlined steps from submission to official administrative approval.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs relative flex flex-col"
              >
                <span className="text-3xl font-black text-indigo-600/30">{step.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed flex-1">
                  {step.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-indigo-600 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Process</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smarter Administration Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Institutional Control
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
                Smarter Administration for Modern Universities
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed text-base">
                Campus administrators, deans, wardens, and mess committees gain real-time visibility into
                student issues, bottlenecks, and compliance.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adminBenefits.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Explore Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin visual showcase */}
            <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                    Administrator Command Dashboard
                  </span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  18h avg turnaround
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400">Total Enrolled Students</span>
                    <p className="text-xl font-black text-white mt-1">5,240</p>
                    <span className="text-[10px] text-emerald-400">+12% this year</span>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                    <span className="text-[11px] text-slate-400">Pending Approvals</span>
                    <p className="text-xl font-black text-amber-400 mt-1">128</p>
                    <span className="text-[10px] text-amber-300">Action required</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
                  <p className="text-xs font-bold text-slate-300 mb-2">Frequently Reported Campus Issues</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>1. Wi-Fi Router Latency</span>
                      <span className="text-amber-400 font-mono">64 reports</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>2. Hostel Plumbing / Tap Leaks</span>
                      <span className="text-amber-400 font-mono">48 reports</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>3. Mess Quality & Food Temperature</span>
                      <span className="text-amber-400 font-mono">32 reports</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-indigo-200">Ready to demo administrator power?</p>
                    <p className="text-[11px] text-indigo-300">One-click approve or reject student leaves.</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/requests')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs"
                  >
                    Open Requests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Make Campus Life Simpler.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-indigo-100 max-w-xl mx-auto">
            Empower students and administrators with effortless request workflows, instant gate passes,
            real-time attendance, and automated support.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold text-base shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Get Started Now
            </button>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-white border border-indigo-400/40 font-bold text-base transition-all cursor-pointer"
            >
              Preview Live Student App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-white font-bold text-base">CampusConnect</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/student/dashboard')}>
              Student Services
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
              Administrator Console
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/student/notices')}>
              Notice Board
            </span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </span>
          </div>

          <p className="text-slate-500">
            © {new Date().getFullYear()} CampusConnect Platform. Built for National College Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
