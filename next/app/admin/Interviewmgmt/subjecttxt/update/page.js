"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function UpdateSubjectPage() {
  const { admin, loading } = useAuth();
  const [subjectId, setSubjectId] = useState("");
  const [subjectData, setSubjectData] = useState(null);

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch subject by ID
  const handleFetchSubject = async () => {
    if (!subjectId) {
      setMessage("Please enter a Subject ID.");
      return;
    }

    setFetching(true);
    setMessage("");
    setSubjectData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Subject not found");

      const data = await res.json();
      setSubjectData(data);
      setSubjectName(data.subjectName || "");
      setDescription(data.description || "");
      setImageUrl(data.imageUrl || "");
      setMessage("✅ Subject fetched. You can update now.");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setFetching(false);
    }
  };

  // Update subject
  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    if (!subjectId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error(data?.message || "Update failed");

      setSubjectData(data);
      setMessage("✅ Subject updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading admin info...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Update Subject</h2>

      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      {/* Fetch Subject by ID */}
      <div style={{ marginBottom: "20px" }}>
        <label>Enter Subject ID:</label><br />
        <input
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
        <button onClick={handleFetchSubject} style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }} disabled={fetching}>
          {fetching ? "Fetching..." : "Fetch Subject"}
        </button>
      </div>

      {/* Update Form */}
      {subjectData && (
        <form onSubmit={handleUpdateSubject}>
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
            <label>Image URL:</label><br />
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/example.png"
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <button type="submit" disabled={updating} style={{ padding: "10px 20px", cursor: "pointer" }}>
            {updating ? "Updating..." : "Update Subject"}
          </button>
        </form>
      )}

      {/* Current Subject Info */}
      {subjectData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h3>Current Subject Info:</h3>
          <p><strong>ID:</strong> {subjectData.id}</p>
          <p><strong>Subject Name:</strong> {subjectData.subjectName}</p>
          <p><strong>Description:</strong> {subjectData.description}</p>
          <p>
            <strong>Image:</strong>{" "}
            {subjectData.imageUrl ? (
              <img src={`${API_BASE_URL}${subjectData.imageUrl}`} alt={subjectData.subjectName} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            ) : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
