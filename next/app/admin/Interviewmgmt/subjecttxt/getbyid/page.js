"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function GetAndDeleteSubjectPage() {
  const { admin, loading } = useAuth(); // Admin context with token
  const [subjectId, setSubjectId] = useState("");
  const [subjectData, setSubjectData] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingSubject, setLoadingSubject] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch subject by ID
  const handleFetchSubject = async () => {
    if (!subjectId) {
      setMessage("Please enter a Subject ID.");
      return;
    }

    setLoadingSubject(true);
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
      setMessage("✅ Subject fetched successfully!");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setLoadingSubject(false);
    }
  };

  // Delete subject
  const handleDeleteSubject = async () => {
    if (!subjectId) return;

    const confirmDelete = confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    setDeleting(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      const data = await res.text();
      setMessage(`✅ ${data}`);
      setSubjectData(null);
      setSubjectId("");
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
      <h2>Fetch and Delete Subject by ID</h2>

      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      <div style={{ marginBottom: "10px" }}>
        <label>Enter Subject ID:</label><br />
        <input
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleFetchSubject} style={{ padding: "10px 20px", cursor: "pointer" }} disabled={loadingSubject}>
          {loadingSubject ? "Fetching..." : "Fetch Subject"}
        </button>
        <button onClick={handleDeleteSubject} style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "red", color: "white" }} disabled={!subjectData || deleting}>
          {deleting ? "Deleting..." : "Delete Subject"}
        </button>
      </div>

      {/* Show fetched subject */}
      {subjectData && (
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
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
