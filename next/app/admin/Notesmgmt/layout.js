"use client";

import Link from "next/link";

export default function NotesMgmtLayout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏢 Notes Management</h2>


    {/* ---------- Notes Text ---------- */}
        <h3>📝 Notes Text</h3>
        <div style={{ marginBottom: "15px" }}>
          <Link href="/admin/Notesmgmt/notestxt/create">
            <button style={{ marginRight: "10px" }}>➕ Create Notes</button>
          </Link>

          <Link href="/admin/Notesmgmt/notestxt/getall">
            <button style={{ marginRight: "10px" }}>📋 Notes List</button>
          </Link>

          <Link href="/admin/Notesmgmt/notestxt/getbyid">
            <button style={{ marginRight: "10px" }}>🔍 Get By ID + 🗑️ Delete Notes</button>
          </Link>

          <Link href="/admin/Notesmgmt/notestxt/update">
            <button style={{ marginRight: "10px" }}>✏️ Update Notes</button>
          </Link>
        </div>



          {/* ---------- Notes Topic ---------- */}
        <h3>📌 Notes Topic</h3>
        <div>
          <Link href="/admin/Notesmgmt/topictxt/create">
            <button style={{ marginRight: "10px" }}>➕ Create Topic</button>
          </Link>

          <Link href="/admin/Notesmgmt/topictxt/gettopic">
            <button style={{ marginRight: "10px" }}>📋 Topic List+🗑️ Delete Notes</button>
          </Link>

          <Link href="/admin/Notesmgmt/topictxt/updatetopic">
            <button style={{ marginRight: "10px" }}>✏️ Update Topic</button>
          </Link>

          <Link href="/admin/Notesmgmt/topictxt/topicbynotes">
            <button>Topic by notes</button>
          </Link>
        </div>


      <hr />

      {/* THIS IS WHERE CHILD PAGE CONTENT WILL APPEAR */}
      <div style={{ marginTop: "20px" }}>
        {children}
      </div>
    </div>
  );
}
