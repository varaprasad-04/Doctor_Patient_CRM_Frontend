import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'doctor', 'patient', 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('crm_user');
    const storedType = localStorage.getItem('crm_userType');
    if (storedUser && storedType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedType);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, type) => {
    try {
      if (type === 'admin') {
        if (email === 'admin@hospital.com' && password === 'admin') {
          const adminUser = { name: 'Hospital Admin', email };
          setUser(adminUser);
          setUserType('admin');
          localStorage.setItem('crm_user', JSON.stringify(adminUser));
          localStorage.setItem('crm_userType', 'admin');
          return { success: true };
        } else {
          throw new Error('Invalid Admin credentials (use admin@hospital.com / admin)');
        }
      }

      if (type === 'doctor') {
        const doctors = await apiService.getAllDoctors();
        const doc = doctors.find((d) => d.email && d.email.toLowerCase() === email.toLowerCase());
        if (doc && doc.password === password) {
          setUser(doc);
          setUserType('doctor');
          localStorage.setItem('crm_user', JSON.stringify(doc));
          localStorage.setItem('crm_userType', 'doctor');
          return { success: true };
        } else {
          throw new Error('Invalid email or password');
        }
      }

      if (type === 'patient') {
        const patients = await apiService.getAllPatients();
        const pat = patients.find((p) => p.email && p.email.toLowerCase() === email.toLowerCase());
        if (pat && pat.password === password) {
          setUser(pat);
          setUserType('patient');
          localStorage.setItem('crm_user', JSON.stringify(pat));
          localStorage.setItem('crm_userType', 'patient');
          return { success: true };
        } else {
          throw new Error('Invalid email or password');
        }
      }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signupPatient = async (patientData) => {
    try {
      const newPatient = await apiService.createPatient(patientData);
      setUser(newPatient);
      setUserType('patient');
      localStorage.setItem('crm_user', JSON.stringify(newPatient));
      localStorage.setItem('crm_userType', 'patient');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const signupDoctor = async (doctorData) => {
    try {
      const newDoctor = await apiService.createDoctor({ ...doctorData, available: true });
      setUser(newDoctor);
      setUserType('doctor');
      localStorage.setItem('crm_user', JSON.stringify(newDoctor));
      localStorage.setItem('crm_userType', 'doctor');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('crm_user');
    localStorage.removeItem('crm_userType');
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      if (userType === 'doctor') {
        const updated = await apiService.getDoctorById(user.doctorId);
        if (updated) {
          setUser(updated);
          localStorage.setItem('crm_user', JSON.stringify(updated));
        }
      } else if (userType === 'patient') {
        const updated = await apiService.getPatientById(user.patientId);
        if (updated) {
          setUser(updated);
          localStorage.setItem('crm_user', JSON.stringify(updated));
        }
      }
    } catch (e) {
      console.error('Failed to refresh user profile data:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userType, loading, login, signupPatient, signupDoctor, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
