"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";

export default function QuestionByIdPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH QUESTION BY ID ---------- */
  const handleFetchQuestion = async () => {
    if (!companyId.trim() || !roundId.trim() || !questionId.trim()) {
      setMessage("❌ Please enter Company ID, Round ID and Question ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setQuestion(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Question not found");

      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE QUESTION ---------- */
  const handleDeleteQuestion = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!question) {
      setMessage("❌ No question fetched to delete");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to DELETE Question ID: ${questionId}?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}/question/${questionId}`,
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
      setQuestion(null);
      setCompanyId("");
      setRoundId("");
      setQuestionId("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Get / Delete Question (ADMIN)</h2>

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
          type="number"
          placeholder="Enter Question ID"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleFetchQuestion} style={{ marginRight: "10px" }}>
          🔍 Fetch Question
        </button>
        <button
          onClick={handleDeleteQuestion}
          style={{
            padding: "8px 12px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ❌ Delete Question
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>
      )}

      {/* Question Details */}
      {question && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>Question ID: {question.id}</h3>
          <p>
            <strong>Order Number:</strong> {question.orderNumber}
          </p>
        </div>
      )}
    </div>
  );
}
