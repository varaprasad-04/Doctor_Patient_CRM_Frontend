import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { apiService } from '../../services/api';
import { Stethoscope, Plus, Search, Trash2 } from 'lucide-react';

export const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to fetch doctor list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filtered = doctors.filter((doc) =>
    doc.name?.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this doctor from records?')) return;
    try {
      await apiService.deleteDoctor(id);
      fetchDoctors();
    } catch (err) {
      alert('Failed to delete doctor record.');
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Doctors Registry</h1>
            <p className="text-slate-500 text-sm mt-1">Review active hospital consultants, experiences, and specialties.</p>
          </div>
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
              placeholder="Search doctor or specialization..."
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
            <div className="p-12 text-center text-slate-400">No doctors registered yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Specialization</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  {filtered.map((doc) => (
                    <tr key={doc.doctorId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">#{doc.doctorId}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">Dr. {doc.name}</td>
                      <td className="px-6 py-4">{doc.specialization}</td>
                      <td className="px-6 py-4">{doc.experience} Years</td>
                      <td className="px-6 py-4">{doc.phone || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`h-2.5 w-2.5 rounded-full inline-block mr-2 ${doc.available ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                        <span className="font-semibold">{doc.available ? 'Available' : 'Unavailable'}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(doc.doctorId)}
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

export default AdminDoctors;
