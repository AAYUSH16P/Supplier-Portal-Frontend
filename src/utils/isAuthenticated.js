// utils/isAuthenticated.js
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };
  