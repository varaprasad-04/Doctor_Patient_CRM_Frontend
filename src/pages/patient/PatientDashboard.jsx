import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Calendar, CheckCircle2, AlertCircle, Clock, CalendarPlus } from 'lucide-react';

export const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    if (!user || !user.patientId) return;
    try {
      setLoading(true);
      const data = await apiService.getPatientAppointments(user.patientId);
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch patient appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  // KPI Calculations
  const completedCount = appointments.filter((app) => app.status === 'COMPLETED').length;
  const pendingCount = appointments.filter((app) => app.status === 'BOOKED').length;
  const acceptedCount = appointments.filter((app) => app.status === 'ACCEPTED').length;

  // Find next upcoming appointment
  const sortedUpcoming = appointments
    .filter((app) => app.status === 'BOOKED' || app.status === 'ACCEPTED')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  
  const nextAppt = sortedUpcoming.length > 0 ? sortedUpcoming[0] : null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'BOOKED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            BOOKED (PENDING)
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
            ACCEPTED
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100">
            REJECTED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-100">
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-100">
            {status}
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Welcome Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Hello, {user?.name || 'Patient'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Welcome to your personal dashboard. Easily book and track your medical appointments.
            </p>
          </div>
          <Link
            to="/patient/book"
            className="w-fit px-5 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
          >
            <CalendarPlus className="h-4.5 w-4.5" />
            <span>Book New Appointment</span>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointment Info Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[180px]">
            <div>
              <span className="text-xs font-bold text-blue-200 uppercase tracking-widest block mb-1">
                Upcoming Appointment
              </span>
              {nextAppt ? (
                <div className="mt-2 space-y-2">
                  <h3 className="text-xl font-extrabold">Dr. {nextAppt.doctor?.name}</h3>
                  <span className="text-sm text-blue-100 font-semibold block">{nextAppt.doctor?.specialization}</span>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-blue-100/90 bg-white/5 border border-white/10 p-3 rounded-xl">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{nextAppt.appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-1 border-l border-white/20 pl-4">
                      <Clock className="h-4 w-4" />
                      <span>{nextAppt.appointmentTime}</span>
                    </div>
                    <div className="flex items-center gap-1 border-l border-white/20 pl-4">
                      <span>Status:</span>
                      <span className="px-2 py-0.5 rounded bg-white/10">{nextAppt.status}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-blue-100 text-sm mt-3 leading-relaxed">
                  You have no pending or accepted appointments scheduled. Use the quick link to book an appointment with our specialists.
                </p>
              )}
            </div>
          </div>

          {/* Stats count cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Completed Consultations</span>
                <span className="text-2xl font-extrabold text-slate-800 mt-1 block">{completedCount}</span>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Pending / Accepted Bookings</span>
                <span className="text-2xl font-extrabold text-slate-800 mt-1 block">{pendingCount + acceptedCount}</span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>Recent Appointments</span>
            </h3>
            <Link
              to="/patient/history"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors animate-pulse"
            >
              View Full History &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No appointments booked yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Specialization</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {appointments.slice(0, 5).map((app) => (
                    <tr key={app.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">Dr. {app.doctor?.name}</td>
                      <td className="px-6 py-4">{app.doctor?.specialization}</td>
                      <td className="px-6 py-4 font-semibold">{app.appointmentDate}</td>
                      <td className="px-6 py-4">{app.appointmentTime}</td>
                      <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
