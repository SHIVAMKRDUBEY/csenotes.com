export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("https://csenotes.com")) {
      return Response.json({
        success: false,
        error: "Invalid URL",
      });
    }

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "csenotes.com",
        key: process.env.INDEXNOW_KEY,
        keyLocation:
          "https://csenotes.com/212681e11e3f9068ec085814.txt",
        urlList: [url],
      }),
    });

    const text = await res.text();

    return Response.json({
      success: res.ok,
      status: res.status,
      response: text,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}
