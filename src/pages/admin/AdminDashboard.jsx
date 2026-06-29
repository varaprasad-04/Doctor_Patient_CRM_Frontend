import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { BarChart3, Users, Stethoscope, Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  // SVG Mock Chart Data
  const monthlyData = [
    { month: 'Jan', val: 40 },
    { month: 'Feb', val: 55 },
    { month: 'Mar', val: 75 },
    { month: 'Apr', val: 80 },
    { month: 'May', val: 65 },
    { month: 'Jun', val: 95 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Hospital Analytics & Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Review live outpatient volume, department capacity, and coordinator statistics.</p>
        </div>

        {/* Admin KPI stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Revenue', val: '$48,250', rate: '+12.5%', color: 'text-blue-600', trend: true, icon: DollarSign },
            { label: 'Active Patients', val: '1,240', rate: '+8.2%', color: 'text-indigo-600', trend: true, icon: Users },
            { label: 'Available Doctors', val: '86', rate: '0.0%', color: 'text-emerald-600', trend: null, icon: Stethoscope },
            { label: 'Beds Occupancy', val: '78%', rate: '-2.4%', color: 'text-amber-600', trend: false, icon: Activity },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col gap-3">
                <div className="flex justify-between items-start text-slate-400">
                  <span className="text-xs font-semibold uppercase tracking-wider">{kpi.label}</span>
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.val}</span>
                  {kpi.trend !== null && (
                    <span className={`text-xs font-bold flex items-center ${kpi.trend ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {kpi.trend ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                      {kpi.rate}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Analytics charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Outpatient Volume Trend</span>
            </h3>
            
            {/* SVG simulated chart bars */}
            <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-slate-100 px-4">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    style={{ height: `${d.val * 2}px` }} 
                    className="w-full bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-all duration-300 relative"
                  >
                    {/* Tooltip on hover */}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.val * 15}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Capacity list */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-bold text-slate-800 text-lg">Department Loading</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Cardiology', load: 85, color: 'bg-blue-600' },
                { name: 'Pediatrics', load: 60, color: 'bg-emerald-500' },
                { name: 'Neurology', load: 45, color: 'bg-purple-600' },
                { name: 'Orthopedics', load: 70, color: 'bg-amber-500' },
              ].map((dep, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>{dep.name}</span>
                    <span>{dep.load}% Capacity</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${dep.load}%` }} className={`h-full ${dep.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
