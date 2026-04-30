"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import { fetchWithToken } from "@/app/admin/authcontext/fetchWithToken";
import API_BASE_URL from "@/app/config";
import { Editor } from "@tinymce/tinymce-react";

export default function UpdateTopicPage() {
  const { admin } = useAuth();

  const [noteId, setNoteId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [topic, setTopic] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

  // ================= FETCH TOPIC =================
  const fetchTopic = async () => {
    if (!noteId.trim() || !topicId.trim()) {
      setMessage("❌ Note ID और Topic ID दोनों डालें");
      return;
    }

    setLoading(true);
    setMessage("");
    setTopic(null);

    try {
      const res = await fetchWithToken(
        `${API_BASE_URL}/api/txtnotes/${noteId}/topics/${topicId}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Topic fetch नहीं हुआ");

      setTopic(data);
      setTitle(data.topicName || "");
      setContent(data.content || "");
      setMessage("✅ Topic सफलतापूर्वक लोड हो गया");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE TOPIC =================
  const updateTopic = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("❌ Title और Content दोनों भरें");
      return;
    }

    setLoading(true);
    setMessage("⏳ Topic अपडेट हो रहा है...");

    try {
      const res = await fetchWithToken(
        `${API_BASE_URL}/api/txtnotes/${noteId}/topics/${topicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicName: title,
            content: content,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update नहीं हुआ");

      setMessage("✅ Topic सफलतापूर्वक अपडेट हो गया");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        Topic अपडेट करें
      </h2>

      {/* STATUS MESSAGE */}
      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("✅") ? "#155724" : "#721c24",
            border: `1px solid ${
              message.includes("✅") ? "#c3e6cb" : "#f5c6cb"
            }`,
          }}
        >
          {message}
        </div>
      )}

      {/* FETCH SECTION */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Note ID"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          style={input}
        />
        <input
          type="number"
          placeholder="Topic ID"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          style={input}
        />
        <button onClick={fetchTopic} style={btnBlue}>
          {loading ? "लोड हो रहा है..." : "Fetch Topic"}
        </button>
      </div>

      {/* EDIT FORM */}
      {topic && (
        <form onSubmit={updateTopic}>
          <div style={{ marginBottom: "20px" }}>
            <label style={label}>Topic Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputFull}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={label}>Topic Content</label>
            <Editor
              apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 600,
                menubar: false,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image",
                  "charmap", "preview", "anchor", "searchreplace",
                  "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | " +
                  "alignleft aligncenter alignright | bullist numlist | " +
                  "link image | code",
                content_style:
                  "body { font-family:Arial,Helvetica,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <button type="submit" style={btnGreen} disabled={loading}>
            {loading ? "अपडेट हो रहा है..." : "Update Topic"}
          </button>
        </form>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "25px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const input = {
  padding: "10px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  width: "150px",
};

const inputFull = {
  width: "100%",
  padding: "10px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginTop: "6px",
};

const btnBlue = {
  padding: "10px 20px",
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnGreen = {
  padding: "12px 25px",
  background: "#198754",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "15px",
  cursor: "pointer",
};

const label = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
};