"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
import { fetchWithToken } from "@/app/admin/authcontext/fetchWithToken";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateTopicWithNoteCheck() {
  const { admin, loading } = useAuth();

  const [noteId, setNoteId] = useState("");
  const [note, setNote] = useState(null);
  const [topics, setTopics] = useState([]);

  const [topicTitle, setTopicTitle] = useState("");        
  const [topicContent, setTopicContent] = useState("");      

  const [message, setMessage] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p>Loading admin info...</p>;
  if (!admin) return <p>आपको admin login होना जरूरी है।</p>;

  const token = admin.token || localStorage.getItem("accessToken");

  const fetchNoteAndTopics = async () => {
    if (!noteId.trim()) {
      setMessage("❌ कृपया Note ID डालें");
      return;
    }

    setLoadingData(true);
    setMessage("");
    setNote(null);
    setTopics([]);

    try {
const noteRes = await fetchWithToken(`${API_BASE_URL}/api/txtnotes/${noteId}`);

      if (!noteRes.ok) {
        const err = await noteRes.json();
        throw new Error(err.message || "Note नहीं मिला");
      }

      const noteData = await noteRes.json();
      setNote(noteData);
      const topicRes = await fetchWithToken(`${API_BASE_URL}/api/txtnotes/${noteId}/topics`);


      if (!topicRes.ok) {
        const err = await topicRes.json();
        throw new Error(err.message || "Topics नहीं मिले");
      }

      const topicData = await topicRes.json();
      setTopics(topicData);

      setMessage("✅ Note और Topics सफलतापूर्वक लोड हो गए");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoadingData(false);
    }
  };

  // =================================================
  // CREATE NEW TOPIC
  // =================================================
  const handleCreateTopic = async (e) => {
    e.preventDefault();

    if (!noteId.trim()) {
      setMessage("❌ Note ID आवश्यक है");
      return;
    }

    if (!topicTitle.trim() || !topicContent.trim()) {
      setMessage("❌ Topic Title और Content दोनों भरें");
      return;
    }

    setSubmitting(true);
    setMessage("⏳ Topic जोड़ा जा रहा है...");

    try {
const res = await fetchWithToken(`${API_BASE_URL}/api/txtnotes/${noteId}/topics`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    topicName: topicTitle,
    content: topicContent,
  }),
});
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Topic नहीं जोड़ा गया");
      }

      setMessage(`✅ Topic "${topicTitle}" सफलतापूर्वक जोड़ा गया`);
      setTopicTitle("");
      setTopicContent("");

      // Refresh list
      await fetchNoteAndTopics();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Auto scroll to message
  useEffect(() => {
    if (message) {
      const el = document.getElementById("statusMessage");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [message]);

  // =================================================
  // RENDER
  // =================================================
  return (
    <div style={container}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        Note में नया Topic जोड़ें
      </h2>

      {/* Note ID + Fetch Button */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="number"
          placeholder="Note ID डालें"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={fetchNoteAndTopics}
          disabled={loadingData}
          style={fetchBtn}
        >
          {loadingData ? "लोड हो रहा है..." : "Note चेक करें"}
        </button>
      </div>

      {/* Status Message */}
      {message && (
        <div
          id="statusMessage"
          style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("✅") ? "#155724" : "#721c24",
            border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {message}
        </div>
      )}

      {/* Note Details + Topics + Add Form */}
      {note && (
        <>
          {/* Note Info */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "12px" }}>Note की जानकारी</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>शीर्षक</th>
                  <th style={thStyle}>चित्र</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{note.id}</td>
                  <td style={tdStyle}>{note.title}</td>
                  <td style={tdStyle}>
                    {note.imageUrl ? (
                      <a href={note.imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc" }}>
                        चित्र देखें
                      </a>
                    ) : (
                      "कोई चित्र नहीं"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add New Topic Form */}
          <div>
            <h3 style={{ marginBottom: "16px" }}>नया Topic जोड़ें</h3>
            <form onSubmit={handleCreateTopic}>
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Topic Title:</label>
                <input
                  type="text"
                  placeholder="Topic का शीर्षक लिखें"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  style={inputFull}
                  required
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Topic Content (Rich Text):</label>
                <Editor
                  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
                  value={topicContent}
                  onEditorChange={(content) => setTopicContent(content)}
                  init={{
                    height: 600,
                    menubar: false,
                    plugins: [
                      "advlist", "autolink", "lists", "link", "image",
                      "charmap", "preview", "anchor", "searchreplace",
                      "visualblocks", "code", "fullscreen", "insertdatetime",
                      "media", "table", "help", "wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic underline | alignleft aligncenter alignright | " +
                      "bullist numlist outdent indent | link image | code",
                    content_style: "body { font-family:Arial,Helvetica,sans-serif; font-size:14px }",
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: (callback) => {
                      const input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = () => {
                        const file = input.files[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                          callback(reader.result, { title: file.name });
                        };
                        reader.readAsDataURL(file);
                      };
                      input.click();
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={submitBtn}
              >
                {submitting ? "जोड़ रहा है..." : "Topic जोड़ें"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

// ================= STYLES =================
const container = {
  maxWidth: "900px",
  margin: "30px auto",
  padding: "24px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
  fontSize: "14px",
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  background: "#f8f9fa",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  verticalAlign: "top",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  width: "180px",
};

const inputFull = {
  width: "100%",
  padding: "10px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  marginTop: "6px",
};

const fetchBtn = {
  padding: "10px 20px",
  background: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
};

const submitBtn = {
  padding: "12px 28px",
  background: "#198754",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "12px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "600",
  fontSize: "15px",
};