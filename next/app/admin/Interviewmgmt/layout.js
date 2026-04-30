"use client";

import Link from "next/link";

export default function InterviewMgmtLayout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏢 uploadpdf</h2>

 <h3>Interview Text subject Management</h3>

        <Link href="/admin/Interviewmgmt/subjecttxt/create">
          <button style={{ marginRight: "10px" }}>➕ Create Subject</button>
        </Link>

        <Link href="/admin/Interviewmgmt/subjecttxt/getall">
          <button style={{ marginRight: "10px" }}>📋 Subject List</button>
        </Link>

        <Link href="/admin/Interviewmgmt/subjecttxt/update">
          <button style={{ marginRight: "10px" }}>✏️ Update Subject</button>
        </Link>

        <Link href="/admin/Interviewmgmt/subjecttxt/getbyid">
          <button style={{ marginRight: "10px" }}> getby id + 🗑️ Delete</button>
        </Link>

  <br/>
 <h3>Interview Text question Management</h3>


 <Link href="/admin/Interviewmgmt/questiontxt/create">
          <button style={{ marginRight: "10px" }}>Create Question</button>
        </Link>

        <Link href="/admin/Interviewmgmt/questiontxt/getall">
          <button style={{ marginRight: "10px" }}>📚 Get Question by Subject</button>
        </Link>


        <Link href="/admin/Interviewmgmt/questiontxt/update">
          <button>✏️ Update Question</button>
        </Link>

        <Link href="/admin/Interviewmgmt/questiontxt/getbyid">
          <button style={{ marginRight: "10px" }}> getby id + 🗑️ Delete</button>
        </Link>
      <hr />

      {/* THIS IS WHERE CHILD PAGE CONTENT WILL APPEAR */}
      <div style={{ marginTop: "20px" }}>
        {children}
      </div>
    </div>
  );
}
