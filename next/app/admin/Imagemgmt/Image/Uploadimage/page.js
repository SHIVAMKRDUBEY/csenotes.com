"use client";

import { useState } from "react";
import API_BASE_URL from "@/app/config";

export default function UploadImagePage() {
  const [formData, setFormData] = useState({
    uploadType: "",
    companyName: "",
    interviewSubject: "",
    notesSubject: "",
    imageText: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_KB = 300;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInKB = file.size / 1024;
    setImageSize(sizeInKB.toFixed(2));

    if (sizeInKB > MAX_SIZE_KB) {
      setSizeError("Image size must be less than 300 KB");
      setImageFile(null);
    } else {
      setSizeError("");
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select a valid image (Max 300KB)");
      return;
    }

    if (!formData.uploadType) {
      alert("Upload Type is required");
      return;
    }

    if (!formData.imageText) {
      alert("Image Text is required");
      return;
    }

    const token = localStorage.getItem("accessToken");

    const data = new FormData();
    data.append("uploadType", formData.uploadType);
    data.append("imageText", formData.imageText);
    data.append("image", imageFile);

    if (formData.companyName)
      data.append("companyName", formData.companyName);

    if (formData.interviewSubject)
      data.append("interviewSubject", formData.interviewSubject);

    if (formData.notesSubject)
      data.append("notesSubject", formData.notesSubject);

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/subjectsimage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");

      alert("Image Uploaded Successfully");

      setFormData({
        uploadType: "",
        companyName: "",
        interviewSubject: "",
        notesSubject: "",
        imageText: "",
      });

      setImageFile(null);
      setImageSize(null);
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📤 Upload Subject Image</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {renderInput("Upload Type *", "uploadType", "INTERVIEW")}
          {renderInput("Company Name (Optional)", "companyName", "TCS")}
          {renderInput("Interview Subject (Optional)", "interviewSubject", "Java")}
          {renderInput("Notes Subject (Optional)", "notesSubject", "Spring Boot")}
          {renderInput("Image Text *", "imageText", "Spring Boot Notes")}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Image *</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <p style={styles.helperText}>Max size: 300 KB</p>

            {imageSize && (
              <p style={styles.sizeText}>
                Selected Size: <strong>{imageSize} KB</strong>
              </p>
            )}

            {sizeError && <p style={styles.error}>{sizeError}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || sizeError}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );

  function renderInput(label, name, placeholder) {
    return (
      <div style={styles.inputGroup}>
        <label style={styles.label}>{label}</label>
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          style={styles.input}
        />
      </div>
    );
  }
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  helperText: {
    fontSize: "12px",
    color: "gray",
    marginTop: "5px",
  },
  sizeText: {
    fontSize: "13px",
    marginTop: "5px",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },
};
