import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { History, Calendar, Heart, ShieldAlert } from 'lucide-react';

export const AppointmentHistory = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user || !user.patientId) return;
      try {
        setLoading(true);
        const data = await apiService.getPatientAppointments(user.patientId);
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch appointment log history.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

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
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Appointment History</h1>
          <p className="text-slate-500 text-sm mt-1">Review all your previous consults, diagnosis records, and prescriptions.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <History className="h-5 w-5 text-blue-500" />
              <span>Full Medical Log</span>
            </h3>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No historical records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Schedule</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Diagnosis</th>
                    <th className="px-6 py-4">Prescription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {appointments.map((app) => (
                    <tr key={app.appointmentId} className="hover:bg-slate-50/55 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">Dr. {app.doctor?.name}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{app.doctor?.specialization}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{app.appointmentDate}</span>
                          <span className="text-xs text-slate-400 mt-0.5">{app.appointmentTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                      <td className="px-6 py-4">
                        {app.status === 'COMPLETED' ? (
                          <div className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg text-xs leading-relaxed max-w-xs">
                            {app.diagnosis || 'No diagnosis logged'}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {app.status === 'COMPLETED' ? (
                          <div className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg text-xs leading-relaxed max-w-xs font-semibold text-slate-700">
                            {app.prescription || 'No prescription logged'}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
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
    </DashboardLayout>
  );
};

export default AppointmentHistory;
