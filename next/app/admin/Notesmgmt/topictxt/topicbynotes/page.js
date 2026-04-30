"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

export default function TopicsByNotePage() {
  const { admin, loading } = useAuth();
  const [noteId, setNoteId] = useState("");
  const [topics, setTopics] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingTopics, setLoadingTopics] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!admin) return <p>You must be logged in as an admin.</p>;

  const token = admin.token || localStorage.getItem("accessToken");

  // ------------------- FETCH TOPICS -------------------
  const fetchTopics = async () => {
    if (!noteId) {
      setMessage("❌ Enter Note ID");
      return;
    }

    setLoadingTopics(true);
    setMessage("");
    setTopics([]);

    try {
      const res = await fetch(`${API_BASE_URL}/api/txtnotes/${noteId}/topics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch topics");

      setTopics(data);
      if (data.length === 0) setMessage("⚠️ No topics found for this note.");
      else setMessage(`✅ ${data.length} topics fetched successfully`);
    } catch (err) {
      console.error("Fetch topics error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoadingTopics(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Topics for a Note</h2>

      {/* NOTE ID INPUT */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Note ID"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
        <button
          onClick={fetchTopics}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Fetch Topics
        </button>
      </div>

      {/* STATUS MESSAGE */}
      {message && (
        <p
          style={{
            color: message.includes("No topics")
              ? "orange"
              : message.includes("successfully")
              ? "green"
              : "red",
          }}
        >
          {message}
        </p>
      )}

      {loadingTopics && <p>Loading topics...</p>}

      {/* TOPICS TABLE */}
      {topics.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Title</th>
              <th style={th}>Description</th>
            </tr>
          </thead>
        <tbody>
  {topics.map((topic) => {
    if (!topic) return null; // agar topic null ho to skip karo
    return (
      <tr key={topic.topicId}>
        <td style={td}>{topic.topicId ?? ""}</td>
        <td style={td}>{topic.topicName ?? ""}</td>
        <td style={td}>{stripHtml(topic.content) ?? ""}</td>
      </tr>
    );
  })}
</tbody>
        </table>
      )}
    </div>
  );
}

// ------------------- STYLES -------------------
const th = { border: "1px solid #ccc", padding: "8px" };
const td = { border: "1px solid #ccc", padding: "8px" };
