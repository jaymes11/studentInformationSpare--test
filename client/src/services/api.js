import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  }
});

// Auth API calls
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get('/auth/check');
  return response.data;
};

// User API calls
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Student API calls
export const createStudent = async (studentData) => {
  const response = await api.post('/students', studentData);
  return response.data;
};

export const getAllStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
}; 