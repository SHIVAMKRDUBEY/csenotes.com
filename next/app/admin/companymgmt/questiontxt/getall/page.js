"use client";

import { useState } from "react";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function QuestionsByRoundPage() {
  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH QUESTIONS BY ROUND ---------- */
  const handleFetchQuestions = async () => {
    if (!companyId.trim() || !roundId.trim()) {
      setMessage("❌ Please enter Company ID and Round ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setQuestions([]);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/company/${companyId}/round/${roundId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Questions not found");

      const data = await res.json();
      setQuestions(data);
      if (data.length === 0) setMessage("⚠️ No questions found for this round");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Get Questions of a Round</h2>

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
        <button onClick={handleFetchQuestions}>Fetch Questions</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "orange" }}>{message}</p>
      )}

      {/* Questions List */}
      {questions.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Questions for Round ID: {roundId}</h3>
          <ol>
            {questions.map((q) => (
              <li key={q.id}>
                <strong>Q:</strong> {q.question} <br />
                <strong>A:</strong> {q.answer} <br />
                <strong>Order:</strong> {q.orderNumber}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
