"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function UpdateRoundPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [roundName, setRoundName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- UPDATE ROUND ---------- */
  const handleUpdateRound = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!companyId.trim() || !roundId.trim() || !roundName.trim()) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ roundName }),
        }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text || "Update failed");

      setMessage(`✅ ${text}`);
      setRoundName("");
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
      <h2>Update Round (ADMIN)</h2>

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
        <input
          type="text"
          placeholder="Enter New Round Name"
          value={roundName}
          onChange={(e) => setRoundName(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleUpdateRound}>Update Round</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>
      )}
    </div>
  );
}
