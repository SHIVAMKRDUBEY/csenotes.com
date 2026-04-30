"use client";

import { useState } from "react";
import API_BASE_URL from "@/app/config";

export default function GetImageByFilterPage() {
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(null);

  // ✅ Copy to clipboard
  const copyToClipboard = (text, imgId) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(imgId);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  // ✅ GET BY TYPE
  const handleSearch = async () => {
    if (!type) return alert("Please enter upload type (Example: COMPANY)");

    try {
      setLoading(true);
      setMessage("");
      setData([]);

      const res = await fetch(`${API_BASE_URL}/api/subjectsimage/type/${type}`);
      if (!res.ok) throw new Error("No data found");

      const result = await res.json();
     // console.log("✅ API Response:", result);

      // Flatten all images across companies/items
      const flattenedImages = result.flatMap((item) =>
        item.images?.map((img) => ({
          ...img,
          parentId: item.id,
          companyName: item.companyName,
          uploadType: item.uploadType,
          interviewSubject: item.interviewSubject,
          notesSubject: item.notesSubject,
        })) || []
      );

      setData(flattenedImages);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      padding: "2rem",
      maxWidth: "1600px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: "2rem",
      color: "#333",
    },
    searchBar: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    input: {
      padding: "8px",
      width: "200px",
      marginRight: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
      marginRight: "10px",
    },
    imageGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)", // 5 images per row
      gap: "1rem",
    },
    imageCard: {
      background: "#f9f9f9",
      borderRadius: "8px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      padding: "5px",
      boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
    },
    imgWrapper: { position: "relative", width: "100%", flexGrow: 1 },
    image: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      display: "block",
      borderBottom: "1px solid #ddd",
      borderRadius: "6px",
    },
    overlay: { position: "absolute", bottom: "5px", right: "5px" },
    copyBtn: {
      background: "rgba(0, 123, 255, 0.9)",
      color: "#fff",
      border: "none",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "0.8rem",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    imgText: {
      fontSize: "0.75rem",
      padding: "0.3rem",
      textAlign: "center",
      color: "#333",
    },
    imgInfo: {
      fontSize: "0.65rem",
      textAlign: "center",
      color: "#555",
      marginBottom: "2px",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📂 Get Images By Upload Type</h1>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter Upload Type (COMPANY)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {message && <p style={{ textAlign: "center" }}>{message}</p>}

      {/* ✅ Show All Images in Continuous Grid */}
      {data.length > 0 ? (
        <div style={styles.imageGrid}>
          {data.map((img) => (
            <div key={`${img.parentId}-${img.id}`} style={styles.imageCard}>
              <div style={styles.imgWrapper}>
                <img
                  src={`${API_BASE_URL}${img.imagePath.replace(/\\/g, "/")}`}
                  alt={img.imageName}
                  style={styles.image}
                />
                <div style={styles.overlay}>
                  <button
                    style={styles.copyBtn}
                    onClick={() =>
                      copyToClipboard(
                        `${API_BASE_URL}${img.imagePath.replace(/\\/g, "/")}`,
                        img.id
                      )
                    }
                  >
                    {copied === img.id ? "✔ Copied" : "Copy URL"}
                  </button>
                </div>
              </div>
              <p style={styles.imgText}>{img.text}</p>
              <p style={styles.imgInfo}>
                Company: {img.companyName || "-"} | ID: {img.parentId} | {img.uploadType}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p style={{ textAlign: "center" }}>No records found</p>
      )}
    </div>
  );
}
