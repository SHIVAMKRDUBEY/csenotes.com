"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";
import { Editor } from "@tinymce/tinymce-react";
//const API_URL = "http://localhost:8086";

export default function UpdateQuestionPage() {
  const { admin, loading } = useAuth();
  const [subjectId, setSubjectId] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [questionData, setQuestionData] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [orderNumber, setOrderNumber] = useState(1);

  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch question by ID
  const handleFetchQuestion = async () => {
    if (!subjectId || !questionId) {
      setMessage("Please enter both Subject ID and Question ID.");
      return;
    }

    setFetching(true);
    setMessage("");
    setQuestionData(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}/questions/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Question not found");

      const data = await res.json();
      setQuestionData(data);
      setQuestion(data.question || "");
      setAnswer(data.answer || "");
      setOrderNumber(data.orderNumber || 1);
      setMessage("✅ Question fetched. You can update now.");
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage(err.message);
    } finally {
      setFetching(false);
    }
  };

  // Update question
  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!subjectId || !questionId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You are not logged in!");
      return;
    }

    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects/${subjectId}/questions/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
          answer,
          orderNumber: Number(orderNumber),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Update failed");

      setQuestionData(data);
      setMessage("✅ Question updated successfully!");
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
      <h2>Update Question</h2>

      {message && <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

      {/* Fetch Question */}
      <div style={{ marginBottom: "20px" }}>
        <label>Subject ID:</label><br />
        <input
          type="number"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />

        <label>Question ID:</label><br />
        <input
          type="number"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />

        <button onClick={handleFetchQuestion} style={{ padding: "10px 20px", cursor: "pointer" }} disabled={fetching}>
          {fetching ? "Fetching..." : "Fetch Question"}
        </button>
      </div>

      {/* Update Form */}
      {questionData && (
        <form onSubmit={handleUpdateQuestion}>
          <div style={{ marginBottom: "10px" }}>
            <label>Question:</label><br />
           <Editor
  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={question}
  onEditorChange={(content) => setQuestion(content)}
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
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Answer:</label><br />
          <Editor
  apiKey="ntgscfx1nytpbytxbqzpo8ik9hh80v3sn1o2nzges0d8lzps"
  value={answer}
  onEditorChange={(content) => setAnswer(content)}
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
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Order Number:</label><br />
            <input
              type="number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
              min={1}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>

          <button type="submit" disabled={updating} style={{ padding: "10px 20px", cursor: "pointer" }}>
            {updating ? "Updating..." : "Update Question"}
          </button>
        </form>
      )}

      {/* Current Question Info */}
      {questionData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h3>Current Question Info:</h3>
          <p><strong>ID:</strong> {questionData.id}</p>
          <p><strong>Question:</strong> {questionData.question}</p>
          <p><strong>Answer:</strong> {questionData.answer}</p>
          <p><strong>Order Number:</strong> {questionData.orderNumber}</p>
        </div>
      )}
    </div>
  );
}
