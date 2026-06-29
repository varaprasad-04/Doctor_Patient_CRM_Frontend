import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export const CompleteModal = ({ isOpen, onClose, onSave, appointmentId }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diagnosis.trim() || !prescription.trim()) {
      setError('Both diagnosis and prescription are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSave(appointmentId, diagnosis, prescription);
      setDiagnosis('');
      setPrescription('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to complete appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in scale-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-500" />
            <span>Complete Appointment</span>
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 hover:bg-slate-50 transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-600 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Diagnosis
            </label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter patient diagnosis (e.g. Common cold, Hypertension)"
              rows="3"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Prescription
            </label>
            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription details (e.g. Paracetamol 500mg - twice daily for 3 days)"
              rows="3"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10 flex items-center gap-1.5"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                'Submit & Complete'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteModal;
