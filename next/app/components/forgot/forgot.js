'use client';

import { useState } from "react";
import API_BASE_URL from "@/app/config";
import styles from "./Forgot.module.css";

export default function ForgotPasswordOtp() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetForm = () => {
    setStep(1);
    setIdentifier("");
    setOtp("");
    setNewUsername("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!identifier.trim()) {
      setMessage("❌ Please enter your email or mobile number.");
      return;
    }

    setLoading(true);
    try {
      const via = /^\d+$/.test(identifier.trim()) ? "mobile" : "email";

const response = await fetch(`${API_BASE_URL}/admin/request-otp`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: identifier.trim() }),
});


      const text = await response.text();
      if (!response.ok) throw new Error(text);

      setMessage("✅ OTP sent successfully! Check your email or mobile.");
      setStep(2);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ Password and Confirm Password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const via = /^\d+$/.test(identifier.trim()) ? "mobile" : "email";
      const body = new URLSearchParams({
        identifier: identifier.trim(),
        otp,
        newUsername,
        newPassword,
        via,
      });

      const response = await fetch(`${API_BASE_URL}/admin/forgot-reset`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: identifier.trim(),
    otp,
    newUsername,
    newPassword
  }),
});

      const text = await response.text();
      if (!response.ok) throw new Error(text);

      setMessage("✅ Password reset successful! You can now log in.");
      setTimeout(() => resetForm(), 3000);
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgotPageWrapper}>
      
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
          <div className={`${styles.shape} ${styles.shape4}`}></div>
        </div>
      </div>

      <div className={styles.forgotContainer}>
    
        <div className={styles.forgotHeader}>
          <div className={styles.headerIcon}>🔐</div>
          <h2>Reset Your Credentials</h2>
          <p>Secure account recovery process</p>

          
          <div className={styles.progressSteps}>
            <div className={`${styles.stepIndicator} ${step >= 1 ? styles.active : ""}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Identify</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={`${styles.stepIndicator} ${step >= 2 ? styles.active : ""}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Verify</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={`${styles.stepIndicator} ${step === 3 ? styles.active : ""}`}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Reset</span>
            </div>
          </div>
        </div>

      
        {message && (
          <div className={`${styles.message} ${message.startsWith("❌") ? styles.error : styles.success}`}>
            <span className={styles.messageIcon}>{message.startsWith("❌") ? "⚠️" : "✅"}</span>
            {message.replace("❌", "").replace("✅", "")}
          </div>
        )}

        
        {step === 1 && (
          <form onSubmit={sendOtp} className={styles.forgotForm}>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}>📧</span>
                Email or Mobile Number
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or mobile number"
                  disabled={loading}
                  className={styles.inputField}
                  required
                />
                <span className={styles.inputIcon}>🔍</span>
              </div>
              <p className={styles.inputHint}>We'll send a verification code to this email or mobile number.</p>
            </div>

            <button type="submit" disabled={loading} className={`${styles.btn} ${styles.btnPrimary} ${loading ? styles.loading : ""}`}>
              {loading ? <> <span className={styles.btnSpinner}></span> Sending OTP... </> : <> <span className={styles.btnIcon}>📨</span> Send Verification Code </>}
            </button>
          </form>
        )}

        
        {step === 2 && (
          <form onSubmit={resetPassword} className={styles.forgotForm}>
            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}>🔑</span>
                OTP
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  disabled={loading}
                  className={styles.inputField}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}>👤</span>
                New Username
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                  disabled={loading}
                  className={styles.inputField}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}>🔒</span>
                New Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={loading}
                  className={styles.inputField}
                  required
                />
                <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span className={styles.labelIcon}>🔒</span>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={loading}
                  className={styles.inputField}
                  required
                />
                <button type="button" className={styles.passwordToggle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" disabled={loading} className={`${styles.btn} ${styles.btnSuccess}`}>
                {loading ? <> <span className={styles.btnSpinner}></span> Resetting... </> : "Reset Password"}
              </button>
              <button type="button" disabled={loading} className={`${styles.btn} ${styles.btnSecondary}`} onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        )}

      
        <div className={styles.helpSection}>
          <h4>Need Assistance?</h4>
          <p>Contact our support team for help with account recovery.</p>
          <button className={styles.helpBtn}>
            <span className={styles.helpIcon}>💬</span> Get Help
          </button>
        </div>
      </div>
    </div>
  );
}