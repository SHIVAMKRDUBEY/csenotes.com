"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";

export default function GetAllQuestionsPage() {
  const { admin, loading } = useAuth();
  const [subjectId, setSubjectId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);

  // 🔹 Convert HTML to plain text
  const htmlToText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleFetchQuestions = async () => {
    if (!subjectId) {
      setMessage("Please enter Subject ID.");
      return;
    }

    setFetching(true);
    setMessage("");
    setQuestions([]);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/interview-txt/subjects/${subjectId}/questions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("No questions found for this subject");

      const data = await res.json();
      setQuestions(data);
      setMessage(`✅ Fetched ${data.length} question(s)`);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setFetching(false);
    }
  };

  if (loading) return <p>Loading admin info...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2>All Questions for a Subject</h2>

      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <div style={{ marginBottom: "20px" }}>
        <label>Subject ID:</label>
        <br />
        <input
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />
        <button
          onClick={handleFetchQuestions}
          disabled={fetching}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {fetching ? "Fetching..." : "Fetch Questions"}
        </button>
      </div>

      {questions.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Question ID
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Question
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Answer</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Order Number
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.questionId}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {q.questionId}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {htmlToText(q.question)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {htmlToText(q.answer)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {q.orderNumber}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(q.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
