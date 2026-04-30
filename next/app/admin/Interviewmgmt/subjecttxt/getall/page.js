
"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function GetAllSubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`);
        if (!res.ok) throw new Error("Failed to fetch subjects");

        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Fetch subjects error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <p>Loading subjects...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (subjects.length === 0) return <p>No subjects found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>All Interview Subjects</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Subject ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Subject Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Description</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subj) => (
            <tr key={subj.subjectId}>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>{subj.subjectId}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{subj.subjectName}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{subj.description}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                {subj.imageUrl ? (
                  <img
                    src={subj.imageUrl.startsWith("http") ? subj.imageUrl : `${API_URL}${subj.imageUrl}`}
                    alt={subj.subjectName}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
