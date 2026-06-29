import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Users, Mail, Phone, Heart } from 'lucide-react';

export const DoctorPatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      if (!user || !user.doctorId) return;
      try {
        setLoading(true);
        const appointments = await apiService.getDoctorAppointments(user.doctorId);
        
        // Extract unique patients
        const patientMap = {};
        appointments.forEach((app) => {
          if (app.patient && app.patient.patientId) {
            patientMap[app.patient.patientId] = app.patient;
          }
        });
        
        setPatients(Object.values(patientMap));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch patient records.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Patients</h1>
          <p className="text-slate-500 text-sm mt-1">Review contact information, demographics, and clinical history of your patients.</p>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-rose-600 font-semibold">{error}</div>
        ) : patients.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-sm">
            No patient records associated with your appointments.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patients.map((pat) => (
              <div key={pat.patientId} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  {/* Name and Basic demographics */}
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg">
                      {pat.name?.charAt(0) || 'P'}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-tight">{pat.name}</h3>
                      <span className="text-xs text-slate-400 font-semibold">
                        ID: #{pat.patientId} | {pat.age || '—'} Years | {pat.gender || '—'}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Contact & Medical details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{pat.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{pat.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Heart className="h-4 w-4 text-slate-400" />
                      <span>Blood Group: <span className="font-semibold text-rose-600">{pat.bloodGroup || 'N/A'}</span></span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Clinical History Summary
                    </span>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      {pat.medicalHistory || 'No previous medical history recorded.'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorPatients;
