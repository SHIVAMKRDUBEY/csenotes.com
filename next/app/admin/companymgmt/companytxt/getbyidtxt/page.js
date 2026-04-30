"use client";

import { useState } from "react";
import { useAuth } from "@/app/admin/authcontext/AuthContext";
import API_BASE_URL from "@/app/config";

export default function CompanyByIdPage() {
  const { admin } = useAuth();

  const [id, setId] = useState("");
  const [company, setCompany] = useState(null);
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
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE COMPANY ---------- */
  const handleDelete = async () => {
    if (!admin) {
      setMessage("❌ Admin access required");
      return;
    }

    if (!company) {
      setMessage("❌ No company selected to delete");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to DELETE company "${company.name}" (ID: ${company.id})?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/company-txt/admin/company/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const text = await res.text();

      if (!res.ok) throw new Error(text || "Delete failed");

      setMessage(`✅ ${text}`);
      setCompany(null);
      setId("");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Get / Delete Company (ADMIN)</h2>

      {/* ID Input */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Enter Company ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleFetch}>Fetch</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* Company Details */}
      {company && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h3>{company.name}</h3>
          <p>
            <strong>ID:</strong> {company.id}
          </p>
          <p>
            <strong>Logo:</strong>{" "}
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                width="100"
                style={{ borderRadius: "4px" }}
              />
            ) : (
              "N/A"
            )}
          </p>

          <button
            onClick={handleDelete}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            ❌ Delete Company
          </button>
        </div>
      )}
    </div>
  );
}
