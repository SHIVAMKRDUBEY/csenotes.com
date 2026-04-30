"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function UpdateNotePage() {
  const { admin, loading } = useAuth();
  const [noteId, setNoteId] = useState("");
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;
  if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

  const token = admin.token || localStorage.getItem("accessToken");

  // Fetch note by ID to pre-fill the form
  const fetchNoteById = async () => {
    if (!noteId) {
      setMessage("Note ID डालें।");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/txtnotes/${noteId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch note");

      setNote(data);
      setTitle(data.title || "");
      setContent(data.content || "");
      setImageUrl(data.imageUrl || "");
      setMessage("");
    } catch (err) {
      console.error("Fetch note error:", err);
      setMessage(err.message);
      setNote(null);
    }
  };

  const updateNote = async () => {
    if (!noteId) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/txtnotes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update note");

      setMessage("✅ Note updated successfully!");
      setNote(data);
    } catch (err) {
      console.error("Update note error:", err);
      setMessage(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Update Note</h2>
      {message && (
        <p style={{ color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* Input Note ID */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Note ID"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
        <button
          onClick={fetchNoteById}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Fetch Note
        </button>
      </div>

      {/* Update Form */}
      {note && (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <button
            onClick={updateNote}
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Update Note
          </button>
        </div>
      )}
    </div>
  );
}
