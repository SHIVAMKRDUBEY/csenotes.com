"use client";

import Link from "next/link";

export default function ImageMgmtLayout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏢 uploadimage</h2>

      {/* Menu buttons */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/admin/Imagemgmt/Image/Uploadimage">
          <button>⬆️ Upload image</button>
        </Link>
         <Link href="/admin/Imagemgmt/Image/getanddeleteimage">
          <button>⬆️ get and delete image</button>
        </Link>
         <Link href="/admin/Imagemgmt/Image/getimagebyfilter">
          <button>⬆️ get image by filter</button>
        </Link>
         <Link href="/admin/Imagemgmt/Image/getimageonly">
          <button>⬆️ getimage only</button>
        </Link>
         <Link href="/admin/Imagemgmt/Image/updateimage">
          <button>⬆️ update image</button>
        </Link>
        <Link href="/admin/Imagemgmt/Image/getallimage">
          <button>⬆️ get all image</button>
        </Link>
      </div>

      {/* THIS IS WHERE CHILD PAGE CONTENT WILL APPEAR */}
      <div style={{ marginTop: "20px" }}>
        {children}
      </div>
    </div>
  );
}
