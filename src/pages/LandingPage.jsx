import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
  Calendar,
  Shield,
  HeartPulse,
  Activity,
  Users,
  Award,
  Clock,
  ArrowRight,
  Smile,
  Quote
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <span className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold tracking-wide uppercase text-blue-200">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              Integrated Healthcare CRM
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Bridging Care between Doctors & Patients.
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0">
              Experience the next generation of healthcare management. Book appointments, manage records, consult with specialists, and track case progress in one unified portal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link
                to="/login?type=patient"
                className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl shadow-blue-900/20 text-center flex items-center justify-center gap-2"
              >
                <span>Patient Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login?type=doctor"
                className="px-8 py-3.5 bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/35 text-white font-bold rounded-xl transition-all text-center flex items-center justify-center"
              >
                Doctor Portal
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center relative">
            {/* Design elements mimicking interface elements */}
            <div className="relative w-[480px] h-[360px] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">D</div>
                <div>
                  <h4 className="font-bold text-sm">Dr. Sarah Jenkins</h4>
                  <span className="text-xs text-blue-200">Cardiologist</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-sm">
                  <span>Patient: Robert Dowson</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">Accepted</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-sm">
                  <span>Patient: Chloe Miller</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">Booked</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-sm">
                  <span>Patient: Marcus Vance</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">Completed</span>
                </div>
              </div>
            </div>
            {/* Absolute element overlays */}
            <div className="absolute -bottom-6 -left-6 bg-white text-slate-800 rounded-xl p-4 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-1000">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Today's Appointments</span>
                <span className="font-bold text-lg text-slate-800">12 Scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-slate-100 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center flex flex-col gap-1 border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">15,000+</span>
            <span className="text-sm font-semibold text-slate-500">Happy Patients</span>
          </div>
          <div className="text-center flex flex-col gap-1 border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">85+</span>
            <span className="text-sm font-semibold text-slate-500">Specialist Doctors</span>
          </div>
          <div className="text-center flex flex-col gap-1 border-r border-slate-100 last:border-0">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">99.8%</span>
            <span className="text-sm font-semibold text-slate-500">Satisfaction Rate</span>
          </div>
          <div className="text-center flex flex-col gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">24/7</span>
            <span className="text-sm font-semibold text-slate-500">Urgent Support</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">About CareSync</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              Leading the Way in Medical Management.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              CareSync CRM was developed to help modern medical practices work efficiently. By replacing cluttered workflows with single-pane, role-specific digital portals, doctors can focus on treating patients instead of managing administration.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We coordinate appointment requests, organize clinical databases, and allow doctors to update patient prescriptions and diagnoses instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded-md text-blue-600 mt-0.5">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Secure & Compliant</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fully aligned with hospital records security.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded-md text-blue-600 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Real-time Updates</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Instant booking status changes and prescription logs.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Visual presentation block */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl flex flex-col gap-3 shadow-lg shadow-blue-500/10">
                <HeartPulse className="h-8 w-8 text-blue-200" />
                <h4 className="font-bold text-lg mt-2">Cardiology</h4>
                <p className="text-xs text-blue-100">Heart screening, vascular monitoring and diagnostic scans.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col gap-3 shadow-md translate-y-6">
                <Award className="h-8 w-8 text-blue-600" />
                <h4 className="font-bold text-lg mt-2 text-slate-800">Best Practice</h4>
                <p className="text-xs text-slate-500">Awarded as the most intuitive medical portal interface.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Our Specializations</span>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight sm:text-4xl">
              Comprehensive Care for Every Patient
            </h2>
            <p className="text-slate-500">
              We offer advanced medical consultation and diagnostic resources across a range of clinical areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Cardiology', desc: 'Heart checks, coronary care, and vascular screening.', icon: HeartPulse },
              { title: 'Pediatrics', desc: 'Child health checks, vaccines, and early development support.', icon: Smile },
              { title: 'Neurology', desc: 'Consultation for nerve systems, chronic pains and brain diagnostics.', icon: Activity },
              { title: 'General Medicine', desc: 'Routine checks, health counseling, and prescriptions.', icon: Users },
              { title: 'Orthopedics', desc: 'Bone, joint rehabilitation, and musculoskeletal diagnosis.', icon: Award },
              { title: 'Emergency Care', desc: 'Round the clock urgent diagnostic consultations and support.', icon: Clock },
            ].map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-transparent transition-all group">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mt-4">{srv.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="text-center flex flex-col gap-3 max-w-xl mx-auto">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight sm:text-4xl">
              What Our Doctors & Patients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "CareSync CRM has completely streamlined our clinic's operations. The dashboard lets me accept appointments and write prescriptions instantly.",
                author: "Dr. Clara Winters",
                role: "Consultant Cardiologist",
              },
              {
                text: "No more waiting in lines or call hold queues. I just login, select my doctor, select a convenient date, and book my slot in less than 30 seconds.",
                author: "Jonathan Pierce",
                role: "Patient",
              },
              {
                text: "The diagnosis and prescription updating feature works beautifully. Patients can view their details from their portal right after their visit.",
                author: "Dr. Marcus Vance",
                role: "General Physician",
              },
            ].map((tst, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md flex flex-col gap-4 relative">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-slate-100" />
                <p className="text-slate-600 text-sm leading-relaxed italic z-10">"{tst.text}"</p>
                <div className="flex flex-col gap-0.5 mt-2 border-t border-slate-50 pt-4">
                  <span className="font-bold text-slate-800 text-sm">{tst.author}</span>
                  <span className="text-xs text-slate-400">{tst.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
