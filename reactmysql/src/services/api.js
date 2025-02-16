import axios from "axios";

const API_BASE_URL = "http://localhost:9090/students"; // Adjust according to your backend URL

export const getAllStudents = async () => {
  return axios.get(`${API_BASE_URL}/api`);
};

export const getStudentById = async (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

export const createStudent = async (student) => {
  return axios.post(`${API_BASE_URL}`, student);
};

export const updateStudent = async (id, student) => {
  return axios.put(`${API_BASE_URL}/${id}`, student);
};

export const deleteStudent = async (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const getRecentActivities = async () => {
  return await axios.get(`${API_BASE_URL}/recent-activities`);
};
