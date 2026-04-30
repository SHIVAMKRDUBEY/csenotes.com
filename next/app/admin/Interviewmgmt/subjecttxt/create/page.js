"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function CreateSubjectPage() {
  const { admin, loading } = useAuth(); // Admin context with token
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !description) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjectName,
          description,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Subject creation failed");

      setMessage("✅ Subject created successfully!");
      setSubjectName("");
      setDescription("");
      setImageUrl("");
    } catch (err) {
      console.error("Create subject error:", err);
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading admin info...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Create New Subject</h2>
      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Subject Name:</label><br />
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL (optional):</label><br />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/images/example.png"
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <button type="submit" disabled={submitting} style={{ padding: "10px 20px", cursor: "pointer" }}>
          {submitting ? "Creating..." : "Create Subject"}
        </button>
      </form>
    </div>
  );
}
