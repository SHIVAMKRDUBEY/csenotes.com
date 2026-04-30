// D:\video\next\app\components\login\route.js
import API_BASE_URL from "@/app/config";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Validation
    if (!username?.trim()) {
      return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }
    if (!password || password.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), { status: 400 });
    }

    // Backend login API call
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // cookies include for session
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: data.message || "Login failed" }), { status: 400 });
    }

    // Success response
    return new Response(JSON.stringify({ success: true, ...data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Something went wrong" }), { status: 500 });
  }
}
