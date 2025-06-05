"use client";

import axios from "axios";

// Créez une instance Axios
const axiosI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// Ajoutez un intercepteur pour gérer les erreurs 401
axiosI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //TODO Gérer de redemander à l'utilisateur de se connecter si il est déconnecté
      // originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return axiosI(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosI;
