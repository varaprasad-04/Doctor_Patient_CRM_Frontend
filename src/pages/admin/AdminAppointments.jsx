import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { apiService } from '../../services/api';
import { Calendar, Search, Trash2 } from 'lucide-react';

export const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointment registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filtered = appointments.filter((app) =>
    app.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
    app.doctor?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment from records?')) return;
    try {
      await apiService.deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert('Failed to delete appointment record.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'BOOKED':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">BOOKED</span>;
      case 'ACCEPTED':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">ACCEPTED</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-rose-50 text-rose-600 rounded-full border border-rose-100">REJECTED</span>;
      case 'COMPLETED':
        return <span className="px-2 py-0.5 text-xs font-semibold bg-purple-50 text-purple-600 rounded-full border border-purple-100">COMPLETED</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold bg-slate-50 text-slate-500 rounded-full border border-slate-100">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Appointments Registry</h1>
          <p className="text-slate-500 text-sm mt-1">Review active, completed, or cancelled scheduling records globally.</p>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor or patient name..."
              className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No appointments scheduled.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Schedule Date/Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filtered.map((app) => (
                    <tr key={app.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">#{app.appointmentId}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{app.patient?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">Dr. {app.doctor?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-medium text-slate-400">{app.doctor?.specialization || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-slate-700">{app.appointmentDate}</span>
                          <span className="text-slate-400 mt-0.5">{app.appointmentTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(app.appointmentId)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
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

export default AdminAppointments;
