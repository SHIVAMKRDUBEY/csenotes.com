"use client";

import Link from "next/link";

export default function CompanyMgmtLayout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏢 Company Management</h2>

  {/* Company TXT */}
       <div style={{ marginBottom: '20px' }}>
        <h3>Company TXT</h3>

        <Link href="/admin/companymgmt/companytxt/uploadtxt">
          <button style={{ marginRight: '10px' }}>⬆️ Upload company txt</button>
        </Link>

        <Link href="/admin/companymgmt/companytxt/listtxt">
          <button style={{ marginRight: '10px' }}>📄 Get all company</button>
        </Link>

          <Link href="/admin/companymgmt/companytxt/getbyidtxt">
          <button style={{ marginRight: '10px' }}>📄 Get company by id + and delete</button>
        </Link>

        <Link href="/admin/companymgmt/companytxt/updatetxt">
          <button style={{ marginRight: '10px' }}>📄 updatecompany</button>
        </Link>
      </div>


      {/* Round TXT */}
<div style={{ marginBottom: '20px' }}>
  <h3>Round TXT</h3>

  <Link href="/admin/companymgmt/roundtxt/createround">
    <button style={{ marginRight: '10px' }}>➕ Create</button>
  </Link>

  <Link href="/admin/companymgmt/roundtxt/getround">
    <button style={{ marginRight: '10px' }}>📋 List</button>
  </Link>

  <Link href="/admin/companymgmt/roundtxt/updateround">
    <button style={{ marginRight: '10px' }}>✏️ Update</button>
  </Link>

  <Link href="/admin/companymgmt/roundtxt/deleteround">
    <button>🗑️ Delete</button>
  </Link>
</div>

{/* Question TXT */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Question TXT</h3>

        <Link href="/admin/companymgmt/questiontxt/create">
          <button style={{ marginRight: '10px' }}>➕ Create</button>
        </Link>

        <Link href="/admin/companymgmt/questiontxt/getall">
          <button style={{ marginRight: '10px' }}>📋 List and delete</button>
        </Link>

        <Link href="/admin/companymgmt/questiontxt/update">
          <button style={{ marginRight: '10px' }}>✏️ Update</button>
        </Link>

        <Link href="/admin/companymgmt/questiontxt/getbyid">
          <button>🗑️ gebyid</button>
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
