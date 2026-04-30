"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/admin/authcontext/AuthContext";
import Link from "next/link";
import API_BASE_URL from "@/app/config";
import styles from "./Login.module.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  //const { setAdmin } = useContext(AuthContext);
  const { loginAdmin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Updated handleSubmit with API_BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrors({});

    try {
       const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

loginAdmin({
  adminData: {
    username: data.username,
    name: data.name,
    role: "admin",
  },
  accessToken: data.accessToken,
  refreshToken: data.refreshToken,
});

      setSuccessMessage("Login successful! Redirecting to admin panel...");
      router.push("/admin");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.adminLoginContainer}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
          <div className={`${styles.shape} ${styles.shape4}`}></div>
        </div>
      </div>

      <div className={styles.loginPanel}>
        
        <div className={styles.welcomePanel}>
          <div className={styles.welcomeContent}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <span className={styles.logoIcon}>🔐</span>
                <span className={styles.logoText}>Only AdminPanel</span>
              </div>
            </div>

            <h2>Welcome Back</h2>
            <h3>Secure Admin Access</h3>
            <p>
              Enter your credentials to access the admin dashboard and manage
              your system with enterprise-grade security.
            </p>
          </div>
        </div>

      
        <div className={styles.loginFormSection}>
          <div className={styles.formContainer}>
            <div
              style={{
                padding: "15px",
                background: "#fffae6",
                color: "#333",
                border: "2px dashed #f39c12",
                borderRadius: "8px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.2rem",
                marginBottom: "20px",
              }}
            >
              🎁 Hey User! You don’t need to log in – access{" "}
              <span style={{ color: "#e74c3c" }}>ALL content FREE</span>{" "}
              instantly! 🎉🚀
            </div>

            <div className={styles.formHeader}>
              <h1>Only Admin Login</h1>
              <p>Enter your credentials to continue</p>
            </div>

            {successMessage && (
              <div className={styles.successMessage}>
                <span>✅</span> {successMessage}
              </div>
            )}

            {errors.submit && (
              <div className={styles.errorMessage}>
                <span>⚠️</span> {errors.submit}
              </div>
            )}

            <form
              className={styles.loginForm}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              
              <div className={styles.inputGroup}>
                <label htmlFor="username">
                  <span className={styles.labelIcon}>👤</span> Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className={errors.username ? styles.error : ""}
                  required
                />
                {errors.username && (
                  <span className={styles.errorText}>{errors.username}</span>
                )}
              </div>

              
              <div className={styles.inputGroup}>
                <label htmlFor="password">
                  <span className={styles.labelIcon}>🔑</span> Password
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className={errors.password ? styles.error : ""}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <span className={styles.errorText}>{errors.password}</span>
                )}
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxText}>
                    Remember this device
                  </span>
                </label>
                <Link href="/forgot" className={styles.forgotPassword}>
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`${styles.loginButton} ${
                  isLoading ? styles.loading : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login to Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;