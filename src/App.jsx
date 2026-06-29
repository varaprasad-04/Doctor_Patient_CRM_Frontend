import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import DoctorList from './pages/DoctorList';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import AppointmentHistory from './pages/patient/AppointmentHistory';
import PatientProfile from './pages/patient/PatientProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Doctor Private Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorPatients />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorProfile />
              </PrivateRoute>
            }
          />

          {/* Patient Private Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/book"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/history"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <AppointmentHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/profile"
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientProfile />
              </PrivateRoute>
            }
          />

          {/* Admin Private Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDoctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminPatients />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminSettings />
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
