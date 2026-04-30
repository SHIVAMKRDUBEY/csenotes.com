"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/config";

export default function CompanyListPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  /* ---------- FETCH COMPANIES ---------- */
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setMessage("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/company-txt/companies`);
        if (!res.ok) throw new Error("Failed to fetch companies");

        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setMessage(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2>All Companies</h2>

      {loading && <p>Loading...</p>}
      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}

      {!loading && companies.length === 0 && <p>No companies found.</p>}

      {companies.length > 0 && (
        <table
          width="100%"
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>id</th>
              <th>Company Name</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1}</td>
                <td>{company.name}</td>
                <td>
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={company.name}
                      width="80"
                      style={{ borderRadius: "4px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
