import apiClient from "./apiClient";

export const login = (email, password) =>
  apiClient.post("/auth/login", { email, password });

export const companyLogin = (email, password) =>
  apiClient.post("/company/login", { email, password });

export const logout = () => {
  localStorage.removeItem("token");
};
