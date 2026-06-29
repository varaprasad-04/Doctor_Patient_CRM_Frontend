import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Calendar, Clock, Clipboard, FileText, CheckCircle2 } from 'lucide-react';

export const BookAppointment = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [searchParams] = useSearchParams();
  const preselectedDocId = searchParams.get('doctorId');

  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDocId || '');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');

  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await apiService.getAllDoctors();
        // Filter only available doctors
        setDoctors(data.filter((doc) => doc.available));
      } catch (err) {
        console.error(err);
        setError('Failed to load list of active doctors.');
      } finally {
        setDoctorsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId || !appointmentDate || !appointmentTime || !reason.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiService.bookAppointment(selectedDoctorId, user.patientId, {
        appointmentDate,
        appointmentTime,
        reason,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Predefined time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Book Appointment</h1>
          <p className="text-slate-500 text-sm mt-1">Select a specialist and pick your desired date and time slot.</p>
        </div>

        {success ? (
          <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center text-center gap-3 shadow-md animate-in zoom-in duration-300">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            <div>
              <h3 className="font-bold text-emerald-800 text-lg">Appointment Booked!</h3>
              <p className="text-sm text-emerald-600 mt-1">
                Your request was recorded successfully. Redirecting you to the dashboard...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm font-semibold">
                {error}
              </div>
            )}

            {/* Doctor Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Select Specialist Doctor
              </label>
              {doctorsLoading ? (
                <div className="h-10 w-full rounded-xl border border-slate-100 animate-pulse bg-slate-50"></div>
              ) : (
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">-- Click to Select Available Doctor --</option>
                  {doctors.map((doc) => (
                    <option key={doc.doctorId} value={doc.doctorId}>
                      Dr. {doc.name} ({doc.specialization})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Appointment Date */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Appointment Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <Calendar className="h-4.5 w-4.5" />
                </span>
                <input
                  type="date"
                  value={appointmentDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Appointment Time slots */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Appointment Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setAppointmentTime(time)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all border ${
                      appointmentTime === time
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Reason for Visit
              </label>
              <div className="relative">
                <span className="absolute top-3 left-3.5 text-slate-400">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain symptoms or purpose (e.g. Annual health checkup, persistent cough...)"
                  rows="3.5"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                'Confirm Appointment Booking'
              )}
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
