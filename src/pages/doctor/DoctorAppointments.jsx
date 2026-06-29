import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Calendar, Search, Filter } from 'lucide-react';

export const DoctorAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAppointments = async () => {
    if (!user || !user.doctorId) return;
    try {
      setLoading(true);
      const data = await apiService.getDoctorAppointments(user.doctorId);
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const filteredAppointments = appointments.filter((app) => {
    const matchesFilter = filter === 'ALL' || app.status === filter;
    const patientName = app.patient?.name?.toLowerCase() || '';
    const matchesSearch = patientName.includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Appointments Log</h1>
          <p className="text-slate-500 text-sm mt-1">Review, search, and filter all scheduled consultations.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name..."
              className="w-full rounded-xl border border-slate-200 pl-9 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 w-full sm:w-auto">
            {['ALL', 'BOOKED', 'ACCEPTED', 'COMPLETED', 'REJECTED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  filter === f
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No appointments found matching filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-100">
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Diagnosis</th>
                    <th className="px-6 py-4">Prescription</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filteredAppointments.map((app) => (
                    <tr key={app.appointmentId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{app.patient?.name || 'N/A'}</td>
                      <td className="px-6 py-4 font-semibold">{app.appointmentDate}</td>
                      <td className="px-6 py-4">{app.appointmentTime}</td>
                      <td className="px-6 py-4 italic text-slate-500">{app.diagnosis || '—'}</td>
                      <td className="px-6 py-4 truncate max-w-xs text-slate-500">{app.prescription || '—'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            app.status === 'BOOKED'
                              ? 'bg-blue-50 text-blue-600 border-blue-100'
                              : app.status === 'ACCEPTED'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : app.status === 'REJECTED'
                              ? 'bg-rose-50 text-rose-600 border-rose-100'
                              : 'bg-purple-50 text-purple-600 border-purple-100'
                          }`}
                        >
                          {app.status}
                        </span>
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

export default DoctorAppointments;
