
"use client";

import { useState } from "react";
import API_BASE_URL from "@/app/config";

export default function GetAndDeleteImagePage() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("✅ URL Copied to clipboard!"))
      .catch((err) => console.error("Copy failed", err));
  };

  // ✅ GET DATA
  const handleGetData = async () => {
    if (!id) return alert("Please enter ID");

    try {
      setLoading(true);
      setMessage("");
      setData(null);

      const res = await fetch(`${API_BASE_URL}/api/subjectsimage/${id}`);
      if (!res.ok) throw new Error("Data not found");

      const result = await res.json();
      console.log("✅ API Response:", result);
      setData(result);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async () => {
    if (!id) return alert("Enter ID first");
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_BASE_URL}/api/subjectsimage/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setMessage("✅ Deleted successfully");
      setData(null);
      setId("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Get & Delete Company Images
      </h2>

      {/* Input & Buttons */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: "8px",
            width: "120px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleGetData}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Get Data
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "red",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {message && <p style={{ textAlign: "center" }}>{message}</p>}

      {/* ✅ SHOW DATA */}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ textAlign: "center" }}>Company Details</h3>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              background: "#f9f9f9",
            }}
          >
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Company Name:</strong> {data.companyName || "-"}</p>
            <p><strong>Upload Type:</strong> {data.uploadType}</p>
            <p><strong>Interview Subject:</strong> {data.interviewSubject || "-"}</p>
            <p><strong>Notes Subject:</strong> {data.notesSubject || "-"}</p>

            {/* Images Grid */}
            <h4 style={{ marginTop: "20px" }}>Images:</h4>
            {data.images && data.images.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "15px",
                  marginTop: "10px",
                }}
              >
                {data.images.map((img) => (
                  <div
                    key={img.id}
                    style={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      padding: "8px",
                      borderRadius: "8px",
                      background: "#fff",
                      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={`${API_BASE_URL}${img.imagePath.replace(/\\/g, "/")}`}
                      alt={img.imageName}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <p style={{ fontSize: "12px", marginTop: "5px" }}>{img.text}</p>

                    {/* Copyable URL */}
                    <input
                      type="text"
                      value={`${API_BASE_URL}${img.imagePath.replace(/\\/g, "/")}`}
                      readOnly
                      onClick={(e) => copyToClipboard(e.target.value)}
                      style={{
                        width: "100%",
                        fontSize: "10px",
                        padding: "2px 4px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No images found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
