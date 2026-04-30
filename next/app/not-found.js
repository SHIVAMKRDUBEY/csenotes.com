import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "40px",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: "0 0 20px 0", color: "#0d6efd" }}>
        404
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
        Oops! The page you are looking for does not exist.
      </p>

      <form
        action="/search"
        method="get"
        style={{ marginBottom: "30px", width: "100%", maxWidth: "400px" }}
      >
        <input
          type="text"
          name="q"
          placeholder="Search notes or placement papers..."
          style={{
            padding: "12px 16px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "12px",
            padding: "10px 20px",
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <Link href="/" style={linkStyle}>Home</Link>
        <Link href="/notes" style={linkStyle}>notes</Link>
        <Link href="/interview" style={linkStyle}>Interview Prep</Link>
        <Link href="/company" style={linkStyle}>Company PYQs</Link>
        <Link href="/about" style={linkStyle}>About</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </div>

      <Link
        href="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "500",
          fontSize: "1rem",
        }}
      >
        Go to Home
      </Link>
    </main>
  );
}

// Shared link style (JS version, no TypeScript)
const linkStyle = {
  padding: "8px 12px",
  backgroundColor: "#f1f1f1",
  borderRadius: "5px",
  textDecoration: "none",
  color: "#333",
  fontWeight: 500,
  transition: "background-color 0.2s",
};