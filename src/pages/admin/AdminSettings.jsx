import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Settings, Save, Bell, Shield, Keyboard, Database } from 'lucide-react';

export const AdminSettings = () => {
  const [hospName, setHospName] = useState('CareSync General Hospital');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess('Hospital configuration settings saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure global notification routing, audit log retention, and portal preferences.</p>
        </div>

        {success && (
          <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-sm font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Section 1: General Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-50 pb-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span>General Settings</span>
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Hospital/Practice Name
              </label>
              <input
                type="text"
                value={hospName}
                onChange={(e) => setHospName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Section 2: Notifications */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-50 pb-2">
              <Bell className="h-4 w-4 text-blue-500" />
              <span>Notification Routes</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Email Alerts</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Send doctor dashboard request updates via mail.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${emailAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">SMS Notifications</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Alert patients of accepted bookings via carrier SMS.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${smsAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Security */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-50 pb-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Portal Security</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Session Auto-Timeout (Minutes)
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="120">120 Minutes (2 hours)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
          >
            <Save className="h-4.5 w-4.5" />
            <span>Save System Configurations</span>
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
