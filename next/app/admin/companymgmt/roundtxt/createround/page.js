"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function CreateRoundPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundName, setRoundName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- CREATE ROUND ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!companyId.trim()) {
      setMessage("❌ Please enter Company ID");
      return;
    }

    if (!roundName.trim()) {
      setMessage("❌ Please enter Round Name");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("❌ Admin not logged in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roundName }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Round creation failed");

      setMessage(`✅ Round "${roundName}" created successfully for Company ID ${companyId}`);
      setRoundName("");
      setCompanyId("");
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Create Round (ADMIN)</h2>

      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Company ID:</label>
          <input
            type="number"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Round Name:</label>
          <input
            type="text"
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            placeholder="Online Assessment"
            required
            style={{ width: "100%", padding: "6px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Round"}
        </button>
      </form>
    </div>
  );
}
