"use client";

import { useState } from "react";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function CompanyRoundsPage() {
  const [id, setId] = useState("");
  const [rounds, setRounds] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH ROUNDS BY COMPANY ID ---------- */
  const handleFetchRounds = async () => {
    if (!id.trim()) {
      setMessage("❌ Please enter Company ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setRounds([]);

    try {
      const res = await fetch(`${API_BASE_URL}/api/company-txt/company/${id}/rounds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Rounds not found");

      const data = await res.json();

      // Ignore nested questions
      const filteredRounds = data.map(({ id, roundName, date }) => ({
        id,
        roundName,
        date,
      }));

      setRounds(filteredRounds);

      if (filteredRounds.length === 0) setMessage("⚠️ No rounds found for this company");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Get Rounds of a Company</h2>

      {/* ID Input */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleFetchRounds}>Fetch Rounds</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "orange" }}>{message}</p>
      )}

      {/* Rounds Grid */}
      {rounds.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Rounds for Company ID: {id}</h3>

          {/* Header Row */}
          <div
            style={{
              display: "flex",
              fontWeight: "bold",
              borderBottom: "2px solid #333",
              padding: "8px 0",
            }}
          >
            <div style={{ flex: 1 }}>ID</div>
            <div style={{ flex: 3 }}>Round Name</div>
            <div style={{ flex: 2 }}>Date</div>
          </div>

          {/* Data Rows */}
          {rounds.map((round) => (
            <div
              key={round.id}
              style={{
                display: "flex",
                padding: "8px 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <div style={{ flex: 1 }}>{round.id}</div>
              <div style={{ flex: 3 }}>{round.roundName}</div>
              <div style={{ flex: 2 }}>{round.date || "N/A"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
