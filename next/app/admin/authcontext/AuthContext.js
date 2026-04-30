"use client";
import { createContext, useContext, useEffect, useState } from "react";

import API_BASE_URL from "@/app/config";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const storedAdmin = localStorage.getItem("admin");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (storedAdmin && accessToken && refreshToken) {
    setAdmin({
      ...JSON.parse(storedAdmin),
      accessToken,
      refreshToken,
    });
  } else {
    setAdmin(null); // ✅ sirf admin null
  }

  setLoading(false);
}, []);
  // 🔹 Login
  const loginAdmin = ({ adminData, accessToken, refreshToken }) => {
    setAdmin({ ...adminData, accessToken, refreshToken });
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  // 🔹 Logout
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  // 🔹 Refresh Access Token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const res = await fetch(`${API_BASE_URL}/admin/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) throw new Error("Refresh token expired");

      const data = await res.json();

      localStorage.setItem("accessToken", data.accessToken);

      setAdmin((prev) => ({
        ...prev,
        accessToken: data.accessToken,
      }));

      return data.accessToken;
    } catch (err) {
      logoutAdmin();
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ admin, loginAdmin, logoutAdmin, refreshAccessToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

