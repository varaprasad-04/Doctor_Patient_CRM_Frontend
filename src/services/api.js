import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Doctor APIs
  getAllDoctors: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },
  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },
  createDoctor: async (doctorData) => {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  },
  updateDoctor: async (id, doctorData) => {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  },
  deleteDoctor: async (id) => {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  },

  // Patient APIs
  getAllPatients: async () => {
    const response = await api.get('/patients');
    return response.data;
  },
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },
  createPatient: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },
  deletePatient: async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  },

  // Appointment APIs
  bookAppointment: async (doctorId, patientId, appointmentData) => {
    const response = await api.post(`/appointments/${doctorId}/${patientId}`, appointmentData);
    return response.data;
  },
  getAllAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },
  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },
  getDoctorAppointments: async (doctorId) => {
    const response = await api.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  },
  getPatientAppointments: async (patientId) => {
    const response = await api.get(`/appointments/patient/${patientId}`);
    return response.data;
  },
  acceptAppointment: async (appointmentId) => {
    const response = await api.put(`/appointments/${appointmentId}/accept`);
    return response.data;
  },
  rejectAppointment: async (appointmentId) => {
    const response = await api.put(`/appointments/${appointmentId}/reject`);
    return response.data;
  },
  completeAppointment: async (appointmentId, diagnosis, prescription) => {
    const response = await api.put(`/appointments/${appointmentId}/complete`, {
      diagnosis,
      prescription,
    });
    return response.data;
  },
};

export default api;
