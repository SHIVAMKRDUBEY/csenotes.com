"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
import { Editor } from "@tinymce/tinymce-react";

export default function UpdateQuestionPage() {
  const { admin } = useAuth();

  const [companyId, setCompanyId] = useState("");
  const [roundId, setRoundId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roundName, setRoundName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH COMPANY & ROUND ---------- */
  const handleFetchRound = async () => {
    if (!companyId.trim() || !roundId.trim()) {
      setMessage("❌ Please enter Company ID and Round ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setCompanyName("");
    setRoundName("");
    setQuestionText("");
    setAnswerText("");
    setOrderNumber("");

    try {
      // 1️⃣ Fetch company
      const resCompany = await fetch(`${API_BASE_URL}/api/company-txt/admin/company/${companyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!resCompany.ok) throw new Error("Company not found");
      const companyData = await resCompany.json();
      setCompanyName(companyData.companyName || "N/A");

      // 2️⃣ Find the round
      const round = companyData.rounds?.find((r) => r.id === Number(roundId));
      if (!round) throw new Error("Round not found in this company");

      setRoundName(round.roundName || "N/A");
      setMessage("✅ Company & Round fetched successfully");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- FETCH QUESTION ---------- */
  const handleFetchQuestion = async () => {
    if (!companyId.trim() || !roundId.trim() || !questionId.trim()) {
      setMessage("❌ Please enter Company ID, Round ID, and Question ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setQuestionText("");
    setAnswerText("");
    setOrderNumber("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}/question/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Question not found");

      const data = await res.json();
      setQuestionText(data.question || "");
      setAnswerText(data.answer || "");
      setOrderNumber(data.orderNumber || "");
      setMessage("✅ Question fetched successfully");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UPDATE QUESTION ---------- */
  const handleUpdateQuestion = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (
      !companyId.trim() ||
      !roundId.trim() ||
      !questionId.trim() ||
      !questionText.trim() ||
      !answerText.trim() ||
      !orderNumber
    ) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${companyId}/round/${roundId}/question/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            question: questionText,
            answer: answerText,
            orderNumber: Number(orderNumber),
          }),
        }
      );

      const text = await res.text();
      if (!res.ok) throw new Error(text || "Update failed");

      setMessage(`✅ ${text}`);
      setCompanyId("");
      setRoundId("");
      setQuestionId("");
      setCompanyName("");
      setRoundName("");
      setQuestionText("");
      setAnswerText("");
      setOrderNumber("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Fetch & Update Question (ADMIN)</h2>

      {/* Company & Round Inputs */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <input
          type="number"
          placeholder="Enter Round ID"
          value={roundId}
          onChange={(e) => setRoundId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
        />
        <br />
        <button onClick={handleFetchRound} style={{ marginBottom: "10px" }}>
          🔍 Fetch Company & Round
        </button>
      </div>

      {/* Show fetched company & round */}
      {companyName && roundName && (
        <p>
          🏢 Company: {companyName} | 🎯 Round: {roundName}
        </p>
      )}

      {/* Question Inputs */}
      {roundName && (
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Enter Question ID"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleFetchQuestion} style={{ marginBottom: "10px" }}>
            🔍 Fetch Question
          </button>
        </div>
      )}

      {/* Inputs to update question */}
      {questionText && (
        <div style={{ marginBottom: "10px" }}>
         <Editor
  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={questionText}
  onEditorChange={(content) => setQuestionText(content)}
  init={{
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic underline | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | link image | code fullscreen",
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
    <Editor
  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={answerText}
  onEditorChange={(content) => setAnswerText(content)}
  init={{
    height: 600,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic underline | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | link image | code fullscreen",
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
          <input
            type="number"
            placeholder="Enter Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            style={{ padding: "8px", width: "60%", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleUpdateQuestion} style={{ padding: "10px" }}>
            ✅ Update Question
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>
      )}
    </div>
  );
}
