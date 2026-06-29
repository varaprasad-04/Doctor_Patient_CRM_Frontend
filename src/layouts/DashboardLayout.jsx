import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  User,
  LogOut,
  CalendarPlus,
  History,
  Settings,
  BarChart3,
  Menu,
  X,
  Stethoscope,
  ChevronRight,
  Bell
} from 'lucide-react';

export const DashboardLayout = ({ children }) => {
  const { user, userType, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define sidebar links based on user role
  const getSidebarLinks = () => {
    if (userType === 'doctor') {
      return [
        { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
        { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
        { name: 'Patients', path: '/doctor/patients', icon: Users },
        { name: 'Profile', path: '/doctor/profile', icon: User },
      ];
    }
    if (userType === 'patient') {
      return [
        { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
        { name: 'Book Appointment', path: '/patient/book', icon: CalendarPlus },
        { name: 'Appointment History', path: '/patient/history', icon: History },
        { name: 'Profile', path: '/patient/profile', icon: User },
      ];
    }
    if (userType === 'admin') {
      return [
        { name: 'Analytics', path: '/admin/dashboard', icon: BarChart3 },
        { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
        { name: 'Patients', path: '/admin/patients', icon: Users },
        { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ];
    }
    return [];
  };

  const links = getSidebarLinks();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <Stethoscope className="h-6 w-6 text-blue-500" />
            <span>CareSync CRM</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 hover:bg-slate-800 md:hidden"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* User Card */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/40 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-semibold text-white truncate text-sm">{user?.name || 'User'}</h4>
            <span className="text-xs text-slate-500 capitalize">{userType} Portal</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow space-y-1.5 px-4 py-6 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 hover:bg-slate-100 md:hidden"
            >
              <Menu className="h-6 w-6 text-slate-600" />
            </button>
            <h2 className="text-lg font-bold text-slate-800 hidden sm:block">
              {links.find((l) => l.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification placeholder */}
            <button className="relative rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500"></span>
            </button>

            {/* Quick Profile */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <span className="text-sm font-semibold text-slate-700">{user?.name || 'User'}</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-grow overflow-y-auto p-6 md:p-8 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
