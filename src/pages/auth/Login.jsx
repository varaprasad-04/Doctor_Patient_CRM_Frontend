import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Stethoscope, User, Lock, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'patient';
  
  const [activeTab, setActiveTab] = useState(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Sync tab state with query parameters
  useEffect(() => {
    const type = searchParams.get('type');
    if (type && ['patient', 'doctor', 'admin'].includes(type)) {
      setActiveTab(type);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ type: tab });
    setError('');
    // Auto-fill admin credentials for developer convenience
    if (tab === 'admin') {
      setEmail('admin@hospital.com');
      setPassword('admin');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    const result = await login(email, password, activeTab);
    setLoading(false);

    if (result.success) {
      const redirectUrl = searchParams.get('redirect');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        if (activeTab === 'doctor') navigate('/doctor/dashboard');
        else if (activeTab === 'patient') navigate('/patient/dashboard');
        else if (activeTab === 'admin') navigate('/admin/dashboard');
      }
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl p-8 flex flex-col gap-6">
        {/* Header Logo */}
        <div className="text-center flex flex-col items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
            <Stethoscope className="h-8 w-8" />
            <span>CareSync CRM</span>
          </Link>
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mt-1">
            Clinic Access Portals
          </p>
        </div>

        {/* Auth Role Tabs */}
        <div className="flex border-b border-slate-100">
          {['patient', 'doctor', 'admin'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 pb-3 text-sm font-semibold capitalize border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-sm font-semibold border border-rose-100 animate-shake">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User className="h-5 w-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hospital.com"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock className="h-5 w-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              `Log In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
            )}
          </button>
        </form>

        {/* Portal Sign Up Redirects */}
        {activeTab !== 'admin' && (
          <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-50">
            <span>Don't have an account? </span>
            <Link
              to={`/signup?type=${activeTab}`}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign Up as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
