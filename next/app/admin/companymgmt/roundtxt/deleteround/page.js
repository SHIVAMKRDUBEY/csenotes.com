"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function DeleteRoundPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- DELETE ROUND ---------- */
  const handleDeleteRound = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!companyId.trim() || !roundId.trim()) {
      setMessage("❌ Please enter both Company ID and Round ID");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to DELETE Round ID: ${roundId} of Company ID: ${companyId}?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text || "Delete failed");

      setMessage(`✅ ${text}`);
      setCompanyId("");
      setRoundId("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Delete Round (ADMIN)</h2>

      {/* Inputs */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Enter Round ID"
          value={roundId}
          onChange={(e) => setRoundId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <br />
        <button
          onClick={handleDeleteRound}
          style={{
            padding: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ❌ Delete Round
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>
      )}
    </div>
  );
}
