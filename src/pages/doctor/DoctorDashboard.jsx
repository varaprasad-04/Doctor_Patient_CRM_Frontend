import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import CompleteModal from '../../components/CompleteModal';
import {
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
  Check,
  X,
  ClipboardList
} from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Complete Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const fetchAppointments = async () => {
    if (!user || !user.doctorId) return;
    try {
      setLoading(true);
      const data = await apiService.getDoctorAppointments(user.doctorId);
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch doctor appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleAccept = async (id) => {
    if (!window.confirm('Are you sure you want to accept this appointment?')) return;
    try {
      await apiService.acceptAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to accept appointment.');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this appointment?')) return;
    try {
      await apiService.rejectAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to reject appointment.');
    }
  };

  const handleOpenCompleteModal = (id) => {
    setSelectedAppointmentId(id);
    setIsModalOpen(true);
  };

  const handleSaveComplete = async (id, diagnosis, prescription) => {
    await apiService.completeAppointment(id, diagnosis, prescription);
    fetchAppointments();
  };

  // KPI Calculations
  const total = appointments.length;
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const todayCount = appointments.filter((app) => app.appointmentDate === todayStr).length;
  const accepted = appointments.filter((app) => app.status === 'ACCEPTED').length;
  const rejected = appointments.filter((app) => app.status === 'REJECTED').length;
  const completed = appointments.filter((app) => app.status === 'COMPLETED').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'BOOKED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            BOOKED
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
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, Dr. {user?.name || 'Doctor'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Here is your patient appointment and dashboard activity for today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Appts', val: total, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', icon: ClipboardList },
            { label: "Today's Appts", val: todayCount, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', icon: Clock },
            { label: 'Accepted', val: accepted, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', icon: CheckCircle },
            { label: 'Rejected', val: rejected, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', icon: XCircle },
            { label: 'Completed', val: completed, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', icon: FileText },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col gap-2 ${stat.bg}`}>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-2xl font-extrabold ${stat.color}`}>{stat.val}</span>
              </div>
            );
          })}
        </div>

        {/* Main Appointment Board */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>All Appointments</span>
            </h3>
            <button
              onClick={fetchAppointments}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Refresh Table
            </button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No appointments scheduled.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Patient Name</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {appointments.map((app) => (
                    <tr key={app.appointmentId} className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {app.patient?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 font-semibold">{app.appointmentDate}</td>
                      <td className="px-6 py-4">{app.appointmentTime}</td>
                      <td className="px-6 py-4 max-w-xs truncate">{app.reason}</td>
                      <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                      <td className="px-6 py-4 text-right">
                        {app.status === 'BOOKED' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleAccept(app.appointmentId)}
                              title="Accept Appointment"
                              className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all border border-emerald-100"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(app.appointmentId)}
                              title="Reject Appointment"
                              className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all border border-rose-100"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {app.status === 'ACCEPTED' && (
                          <button
                            onClick={() => handleOpenCompleteModal(app.appointmentId)}
                            className="px-3.5 py-1.5 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/10 flex items-center gap-1 ml-auto"
                          >
                            <Check className="h-3 w-3" />
                            <span>Complete</span>
                          </button>
                        )}
                        {app.status === 'COMPLETED' && (
                          <span className="text-xs font-semibold text-slate-400">Archived</span>
                        )}
                        {app.status === 'REJECTED' && (
                          <span className="text-xs font-semibold text-slate-400">Cancelled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Complete Diagnosis & Prescription Modal */}
      <CompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveComplete}
        appointmentId={selectedAppointmentId}
      />
    </DashboardLayout>
  );
};

export default DoctorDashboard;
