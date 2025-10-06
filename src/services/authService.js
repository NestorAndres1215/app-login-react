// src/services/authService.js
import axiosInstance from "./axiosInstance";

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const registerUser = async (registerData) => {
  const response = await axiosInstance.post("/auth/register", registerData);
  return response.data;
};
