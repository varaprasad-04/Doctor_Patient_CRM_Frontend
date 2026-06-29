import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-3">
            Reset Password
          </h2>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Provide your email address below, and we'll send you instructions to choose a new password.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in duration-300">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Check Your Email</h4>
              <p className="text-slate-500 text-sm mt-1">
                We've sent a link to <span className="font-semibold text-slate-700">{email}</span>.
              </p>
            </div>
            <Link
              to="/login"
              className="mt-4 px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 mt-2"
            >
              Send Password Reset Link
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
