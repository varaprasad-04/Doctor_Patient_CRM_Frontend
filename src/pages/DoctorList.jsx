import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Award, ShieldCheck, Stethoscope } from 'lucide-react';

export const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await apiService.getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctor list. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookClick = (doctorId) => {
    if (user && userType === 'patient') {
      navigate(`/patient/book?doctorId=${doctorId}`);
    } else {
      navigate(`/login?type=patient&redirect=/patient/book?doctorId=${doctorId}`);
    }
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
              Meet Our Specialist Doctors
            </h1>
            <p className="text-slate-500 text-sm">
              Select an experienced doctor across our range of specialized departments and book your consultation slots online.
            </p>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-center font-semibold">
              {error}
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-100 text-center text-slate-400">
              No doctors are registered in the CRM yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.doctorId}
                  className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex flex-col gap-4">
                    {/* Doctor Header / Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                        <Stethoscope className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">
                          Dr. {doctor.name}
                        </h3>
                        <span className="text-sm font-semibold text-blue-600 block mt-0.5">
                          {doctor.specialization}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-slate-50 my-2" />

                    {/* Stats List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-sm text-slate-500">
                        <Award className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span>Experience: {doctor.experience} Years</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">Contact: {doctor.phone || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm">
                        <div className="w-4 flex justify-center">
                          <span className={`h-2.5 w-2.5 rounded-full ${doctor.available ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                        </div>
                        <span className={`font-semibold ${doctor.available ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {doctor.available ? 'Available' : 'Currently Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <button
                      onClick={() => handleBookClick(doctor.doctorId)}
                      className="w-full h-11 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-4.5 w-4.5" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorList;
