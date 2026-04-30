"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function TopicDetailPage() {
  const { admin, loading } = useAuth();
  const [noteId, setNoteId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [topic, setTopic] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

  const token = admin.token || localStorage.getItem("accessToken");

  // ------------------- FETCH SINGLE TOPIC -------------------
  const fetchTopic = async () => {
    if (!noteId || !topicId) {
      setMessage("❌ Note ID और Topic ID दोनों डालें।");
      return;
    }

    setLoadingData(true);
    setMessage("");
    setTopic(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/txtnotes/${noteId}/topics/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch topic");

      setTopic(data);
      setMessage("✅ Topic fetched successfully");
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  // ------------------- DELETE TOPIC -------------------
  const deleteTopic = async () => {
    if (!confirm("Are you sure you want to delete this topic?")) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/txtnotes/${noteId}/topics/${topicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to delete topic");
      }

      setMessage("✅ Topic deleted successfully!");
      setTopic(null);
      setTopicId("");
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div style={container}>
      <h2>Topic Detail & Delete</h2>

      {/* INPUTS */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Note ID"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          style={input}
        />
        <input
          type="text"
          placeholder="Topic ID"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          style={{ ...input, marginLeft: "10px" }}
        />
        <button onClick={fetchTopic} style={btn}>
          Fetch Topic
        </button>
      </div>

      {message && (
        <p style={{ color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {loadingData && <p>Loading...</p>}

      {/* TOPIC DETAILS */}
      {topic && (
        <div style={{ marginTop: "20px" }}>
          <h3>Topic Details</h3>
          <p><strong>ID:</strong> {topic.topicId || topic.id}</p>
          <p><strong>Title:</strong> {topic.topicName || topic.title}</p>
          <p><strong>Description:</strong> {topic.content || topic.description}</p>

          <button onClick={deleteTopic} style={btnRed}>
            Delete Topic
          </button>
        </div>
      )}
    </div>
  );
}

// ------------------- STYLES -------------------
const container = {
  maxWidth: "800px",
  margin: "30px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
};

const input = {
  padding: "6px",
  width: "150px",
};

const btn = {
  padding: "6px 12px",
  marginLeft: "10px",
};

const btnRed = {
  padding: "10px 20px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
};
