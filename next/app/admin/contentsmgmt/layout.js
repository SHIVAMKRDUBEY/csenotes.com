"use client";

import Link from "next/link";

export default function ContentMgmtLayout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏢 Content Management</h2>

      {/* ADS */}
      <h3>📢 Ads</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link href="/admin/contentsmgmt/ads/create">
          <button>ads create</button>
        </Link>

        <Link href="/admin/contentsmgmt/ads/getall">
          <button>get all</button>
        </Link>

        <Link href="/admin/contentsmgmt/ads/getbyid">
          <button>getby id + delete ads</button>
        </Link>

        <Link href="/admin/contentsmgmt/ads/update">
          <button>update</button>
        </Link>
      </div>

      <br />

      {/* AFFILIATE */}
      <h3>🤝 Affiliate</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link href="/admin/contentsmgmt/affiliate/create">
          <button>create affiliate</button>
        </Link>

        <Link href="/admin/contentsmgmt/affiliate/update">
          <button>update affiliate</button>
        </Link>

        <Link href="/admin/contentsmgmt/affiliate/getall">
          <button>getall affiliate</button>
        </Link>

        <Link href="/admin/contentsmgmt/affiliate/getbyid">
          <button>get by id + delete affiliate</button>
        </Link>
      </div>

      <br />

      {/* SPONSOR */}
      <h3>💼 Sponsor</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link href="/admin/contentsmgmt/sponser/create">
          <button>create sponser</button>
        </Link>

        <Link href="/admin/contentsmgmt/sponser/getbyid">
          <button>get by id + delete sponsor</button>
        </Link>

        <Link href="/admin/contentsmgmt/sponser/update">
          <button>update sponsor</button>
        </Link>

        <Link href="/admin/contentsmgmt/sponser/getall">
          <button>get all sponsor</button>
        </Link>
      </div>

      <hr />

      {/* CHILD CONTENT */}
      <div style={{ marginTop: "20px" }}>
        {children}
      </div>
    </div>
  );
}
