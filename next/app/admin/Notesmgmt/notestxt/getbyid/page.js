"use client";
import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
//const API_URL = "http://localhost:8086";

export default function GetAndDeleteNotePage() {
  const { admin, refreshAccessToken, logoutAdmin } = useAuth();

  const [noteId, setNoteId] = useState("");
  const [note, setNote] = useState(null);
  const [message, setMessage] = useState("");

  const fetchWithAuth = async (url, options = {}) => {
    let token = admin?.accessToken;

    let res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔁 Access token expired
    if (res.status === 401) {
      try {
        token = await refreshAccessToken();

        res = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        logoutAdmin();
        throw new Error("Session expired");
      }
    }

    return res;
  };

  // 🔹 Get note by ID
  const getNote = async () => {
    setMessage("");
    setNote(null);

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/txtnotes/${noteId}`);
      if (!res.ok) throw new Error("Note fetch failed");

      const data = await res.json();
      setNote(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  // 🔹 Delete note
  const deleteNote = async () => {
    try {
      const res = await fetchWithAuth(
        `${API_BASE_URL}/api/txtnotes/${noteId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      setNote(null);
      setMessage("✅ Note deleted successfully");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Get / Delete Note (Admin)</h2>

      <input
        type="number"
        placeholder="Note ID"
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
      />

      <br /><br />

      <button onClick={getNote}>Get Note</button>
      <button onClick={deleteNote} style={{ marginLeft: 10 }}>
        Delete Note
      </button>

      {message && <p style={{ color: "red" }}>{message}</p>}

      {note && (
        <div>
          <p><b>ID:</b> {note.noteId}</p>
          <p><b>Title:</b> {note.title}</p>
          {note.imageUrl && (
            <img src={note.imageUrl} width="150" />
          )}
        </div>
      )}
    </div>
  );
}
