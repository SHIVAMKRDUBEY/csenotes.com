"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function GetAndDeleteQuestionPage() {
  const { admin, loading } = useAuth();
  const [subjectId, setSubjectId] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [questionData, setQuestionData] = useState(null);
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch question by ID
  const handleFetchQuestion = async () => {
    if (!subjectId || !questionId) {
      setMessage("Please enter both Subject ID and Question ID.");
      return;
    }

    setFetching(true);
    setMessage("");
    setQuestionData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Question not found");

      const data = await res.json();
      setQuestionData(data);
      setMessage("✅ Question fetched successfully.");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setFetching(false);
    }
  };

  // Delete question
  const handleDeleteQuestion = async () => {
    if (!subjectId || !questionId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    setDeleting(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}/questions/${questionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      const data = await res.text();
      setMessage(`✅ ${data}`);
      setQuestionData(null);
      setSubjectId("");
      setQuestionId("");
    } catch (err) {
      console.error("Delete error:", err);
      setMessage(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading admin info...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Fetch & Delete Question</h2>

      {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}

      <div style={{ marginBottom: "20px" }}>
        <label>Subject ID:</label><br />
        <input
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />

        <label>Question ID:</label><br />
        <input
          type="number"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />

        <button onClick={handleFetchQuestion} style={{ padding: "10px 20px", cursor: "pointer" }} disabled={fetching}>
          {fetching ? "Fetching..." : "Fetch Question"}
        </button>
      </div>

      {questionData && (
        <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
          <h3>Question Details</h3>
          <p><strong>ID:</strong> {questionData.id}</p>
          <p><strong>Question:</strong> {questionData.question}</p>
          <p><strong>Answer:</strong> {questionData.answer}</p>
          <p><strong>Order Number:</strong> {questionData.orderNumber}</p>

          <button
            onClick={handleDeleteQuestion}
            disabled={deleting}
            style={{ marginTop: "15px", padding: "10px 20px", cursor: "pointer", backgroundColor: "red", color: "white" }}
          >
            {deleting ? "Deleting..." : "Delete Question"}
          </button>
        </div>
      )}
    </div>
  );
}
