import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { apiService } from '../../services/api';
import { Users, Search, Trash2 } from 'lucide-react';

export const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to fetch patient records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filtered = patients.filter((pat) =>
    pat.name?.toLowerCase().includes(search.toLowerCase()) ||
    pat.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient profile?')) return;
    try {
      await apiService.deletePatient(id);
      fetchPatients();
    } catch (err) {
      alert('Failed to delete patient profile.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Patients Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Review basic parameters, medical history files, and registration dates of patients.</p>
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
              placeholder="Search by patient name or email..."
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
            <div className="p-12 text-center text-slate-400">No patients registered in database yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Patient Name</th>
                    <th className="px-6 py-4">Age / Gender</th>
                    <th className="px-6 py-4">Blood Group</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Medical History Summary</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filtered.map((pat) => (
                    <tr key={pat.patientId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">#{pat.patientId}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{pat.name}</td>
                      <td className="px-6 py-4">{pat.age} Years / {pat.gender}</td>
                      <td className="px-6 py-4 font-semibold text-rose-600">{pat.bloodGroup || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-slate-700">{pat.email}</span>
                          <span className="text-slate-400 mt-0.5">{pat.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate italic text-slate-400">
                        {pat.medicalHistory || 'No previous history recorded'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(pat.patientId)}
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

export default AdminPatients;
