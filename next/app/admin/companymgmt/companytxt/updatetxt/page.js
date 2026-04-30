"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";

import API_BASE_URL from "@/app/config";
export default function UpdateCompanyPage() {
  const { admin } = useAuth();

  const [id, setId] = useState("");
  const [company, setCompany] = useState(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- FETCH COMPANY BY ID ---------- */
  const handleFetch = async () => {
    if (!id.trim()) {
      setMessage("❌ Please enter Company ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setCompany(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/company-txt/admin/company/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) throw new Error("Company not found");

      const data = await res.json();
      setCompany(data);
      setName(data.name || "");
      setLogo(data.logo || "");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UPDATE COMPANY ---------- */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!id || !company) {
      setMessage("❌ Fetch a company first");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("❌ Admin not logged in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/company-txt/admin/company/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          logo: logo.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Update failed");

      setMessage("✅ Company updated successfully");
      setCompany(data);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Update Company (ADMIN)</h2>

      {/* ID INPUT */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleFetch}>Fetch Company</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* COMPANY FORM */}
      {company && (
        <form onSubmit={handleUpdate} style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Company Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Logo (filename / URL):</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Company"}
          </button>
        </form>
      )}
    </div>
  );
}
