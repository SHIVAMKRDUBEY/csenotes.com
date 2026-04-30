"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
import { fetchWithToken } from "@/app/admin/authcontext/fetchWithToken";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateQuestionPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [roundName, setRoundName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);

  /* ---------- FETCH COMPANY & ROUND ---------- */
  const handleFetchRound = async () => {
    if (!companyId.trim() || !roundId.trim()) {
      setMessage("❌ Please enter Company ID and Round ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setRoundName("");
    setQuestionText("");
    setAnswerText("");
    setOrderNumber("");

    try {
      const resCompany = await fetchWithToken(`${API_BASE_URL}/api/company-txt/admin/company/${companyId}`);
      if (!resCompany.ok) throw new Error("Company not found");
      const companyData = await resCompany.json();
      const round = companyData.rounds?.find((r) => r.id === Number(roundId));
      if (!round) throw new Error("Round not found in this company");
      setRoundName(round.roundName || "N/A");
      setMessage("✅ Round fetched successfully");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CREATE QUESTION ---------- */
  const handleCreateQuestion = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!companyId.trim() || !roundId.trim() || !questionText.trim() || !answerText.trim() || !orderNumber.trim()) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetchWithToken(
  `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}/question`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: questionText,
      answer: answerText,
      orderNumber: Number(orderNumber),
    }),
  }
);
      const text = await res.text();
      if (!res.ok) throw new Error(text || "Question creation failed");

      setMessage(`✅ ${text}`);
      setQuestionText("");
      setAnswerText("");
      setOrderNumber("");
      setRoundName("");
      setCompanyId("");
      setRoundId("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Fetch Company & Round, then Create Question (ADMIN)</h2>

      {/* Inputs to fetch company & round */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Company ID:</label>
          <input
            type="number"
            placeholder="Enter Company ID"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Round ID:</label>
          <input
            type="number"
            placeholder="Enter Round ID"
            value={roundId}
            onChange={(e) => setRoundId(e.target.value)}
            style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
          />
        </div>
        <button 
          onClick={handleFetchRound} 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "🔍 Fetch Round"}
        </button>
      </div>

      {/* Show round info if fetched */}
      {roundName && (
        <div style={{ 
          marginBottom: "20px", 
          padding: "15px", 
          border: "1px solid #007bff", 
          borderRadius: "5px",
          backgroundColor: "#f0f8ff"
        }}>
          <h3 style={{ marginTop: 0 }}>Round Details</h3>
          <p><strong>Round Name:</strong> {roundName}</p>
          <p><strong>Company ID:</strong> {companyId}</p>
          <p><strong>Round ID:</strong> {roundId}</p>
        </div>
      )}

      {/* Inputs to create question (only visible if round fetched) */}
      {roundName && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Question (Rich Text Editor):
            </label>
<Editor
   apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={questionText}
  onEditorChange={(content) => setQuestionText(content)}
  init={{
    height: 300,
    menubar: false,
    plugins: [
      "image", "link", "lists", "code"
    ],
    toolbar:
      "undo redo | bold italic | bullist numlist | image | code",

    automatic_uploads: true,

    file_picker_types: "image",
    file_picker_callback: (cb) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function () {
          cb(reader.result, { title: file.name });
        };
        reader.readAsDataURL(file);
      };

      input.click();
    },
  }}
/>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Answer (Rich Text Editor):
            </label>
   <Editor
  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={answerText}
  onEditorChange={(content) => setAnswerText(content)}
  init={{
    height: 600,
    menubar: false,

    plugins: [
      "advlist", "autolink", "lists", "link", "image",
      "charmap", "preview", "anchor",
      "searchreplace", "visualblocks", "code",
      "fullscreen", "insertdatetime", "media",
      "table", "help", "wordcount"
    ],

    toolbar:
      "undo redo | formatselect | bold italic underline | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | link image | code",

    /* 👇 YE PART IMAGE FILE PICKER KE LIYE ZAROORI HAI */
    automatic_uploads: true,
    images_upload_url: false,

    file_picker_types: "image",
    file_picker_callback: (cb) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function () {
          cb(reader.result, { title: file.name });
        };

        reader.readAsDataURL(file);
      };

      input.click();
    },
  }}
/>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Order Number:</label>
            <input
              type="number"
              placeholder="Enter Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              style={{ 
                padding: "10px", 
                width: "100%", 
                marginBottom: "20px",
                fontSize: "16px"
              }}
            />
          </div>

          <button 
            onClick={handleCreateQuestion} 
            style={{ 
              padding: "12px 24px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%"
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "✅ Create Question"}
          </button>
        </div>
      )}

      {message && (
        <div style={{ 
          padding: "15px", 
          marginTop: "20px",
          borderRadius: "5px",
          backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
          color: message.includes("✅") ? "#155724" : "#721c24",
          border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
}