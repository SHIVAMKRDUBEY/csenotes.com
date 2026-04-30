"use client";

import { useState, useEffect } from "react";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function GetAllNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoadingNotes(true);
      setMessage("");

      try {
        const res = await fetch(`${API_BASE_URL}/api/txtnotes`); // No headers, no token

        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Fetch notes error:", err);
        setMessage(err.message);
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchNotes();
  }, []);

  if (loadingNotes) return <p>Loading notes...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
      <h2>All Notes</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Note ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.noteId}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{note.noteId}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{note.title}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {note.imageUrl ? (
                    <a href={note.imageUrl} target="_blank" rel="noopener noreferrer">
                      View Image
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
