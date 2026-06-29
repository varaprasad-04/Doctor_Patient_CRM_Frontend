import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, Menu, X, User } from 'lucide-react';

export const MainLayout = ({ children }) => {
  const { user, userType, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (userType === 'doctor') navigate('/doctor/dashboard');
    else if (userType === 'patient') navigate('/patient/dashboard');
    else if (userType === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
              <Stethoscope className="h-7 w-7" />
              <span>CareSync CRM</span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <Link to="/doctors" className="hover:text-blue-600 transition-colors">Doctors</Link>
              <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDashboardRedirect}
                    className="flex items-center gap-1.5 px-4 h-9 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 h-9 text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                    className="px-4 h-9 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"
                  >
                    <span>Sign In / Sign Up</span>
                  </button>
                  {authDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-100 flex flex-col gap-1 z-50">
                      <Link
                        to="/login?type=patient"
                        onClick={() => setAuthDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        Patient Portal
                      </Link>
                      <Link
                        to="/login?type=doctor"
                        onClick={() => setAuthDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      >
                        Doctor Portal
                      </Link>
                      <Link
                        to="/login?type=admin"
                        onClick={() => setAuthDropdownOpen(false)}
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border-t border-slate-50"
                      >
                        Admin Portal
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-blue-600">Home</Link>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-blue-600">About</a>
            <Link to="/doctors" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-blue-600">Doctors</Link>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-blue-600">Services</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 hover:text-blue-600">Contact</a>
            
            <div className="h-px bg-slate-100 my-2" />

            {user ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { handleDashboardRedirect(); setMobileMenuOpen(false); }}
                  className="w-full h-10 font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full h-10 font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Access Portals</span>
                <Link
                  to="/login?type=patient"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center px-4 py-2 border border-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Patient Login
                </Link>
                <Link
                  to="/login?type=doctor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center px-4 py-2 border border-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Doctor Login
                </Link>
                <Link
                  to="/login?type=admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-between items-center px-4 py-2 border border-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
              <Stethoscope className="h-6 w-6 text-blue-500" />
              <span>CareSync CRM</span>
            </Link>
            <p className="text-sm">
              Empowering healthcare facilities and clinics with smooth doctor-patient coordination, digital appointment booking, and smart case tracking.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Portals</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/login?type=patient" className="hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/login?type=doctor" className="hover:text-white transition-colors">Doctor Portal</Link></li>
              <li><Link to="/login?type=admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Emergency Support: 1-800-CARE-SYNC</li>
              <li>Email: info@caresynccrm.com</li>
              <li>Address: Medical Park Blvd, Suite 400, Chicago, IL</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} CareSync CRM. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
