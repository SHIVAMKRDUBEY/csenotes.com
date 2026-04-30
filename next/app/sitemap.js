// const baseUrl = "https://csenotes.com";

// export default async function sitemap() {
//   const [notesRes, interviewRes, companiesRes] = await Promise.all([
//     fetch("http://localhost:8086/api/txtnotes", { cache: "no-store" }),
//     fetch("http://localhost:8086/api/interview-txt/subjects", { cache: "no-store" }),
//     fetch("http://localhost:8086/api/company-txt/companies", { cache: "no-store" })
//   ]);

//   const notes = await notesRes.json();
//   const interviews = await interviewRes.json();
//   const companies = await companiesRes.json();

//   // ✅ Updated slug (only change here)
//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/&/g, "and")
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-|-$/g, "");

//   const now = new Date().toISOString();

//   return [
//     {
//       url: `${baseUrl}`,
//       lastModified: now,
//       changeFrequency: "daily",
//       priority: 1
//     },

//     {
//       url: `${baseUrl}/notes`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     },
//     {
//       url: `${baseUrl}/interview`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     },
//     {
//       url: `${baseUrl}/company`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     },

//     // 🔹 Notes URLs
//     ...notes.map(note => ({
//       url: `${baseUrl}/notes/${createSlug(note.title)}`,
//       lastModified: note.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     })),

//     // 🔹 Interview URLs
//     ...interviews.map(item => ({
//       url: `${baseUrl}/interview/${createSlug(item.subjectName)}`,
//       lastModified: item.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     })),

//     // 🔹 Company URLs
//     ...companies.map(company => ({
//       url: `${baseUrl}/company/${company.id}/rounds`,
//       lastModified: company.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     })),

//     {
//       url: `${baseUrl}/about`,
//       lastModified: now,
//       changeFrequency: "yearly",
//       priority: 0.3
//     },
//     {
//       url: `${baseUrl}/privacy-policy`,
//       lastModified: now,
//       changeFrequency: "yearly",
//       priority: 0.2
//     }
//   ];
// }




// const baseUrl = "https://csenotes.com";

// export default async function sitemap() {
//   const [notesRes, interviewRes, companyRes] = await Promise.all([
//     fetch("http://localhost:8086/api/txtnotes"),
//     fetch("http://localhost:8086/api/interview-txt/subjects"),
//     fetch("http://localhost:8086/api/company-txt/companies")
//   ]);

//   const notes = await notesRes.json();
//   const interviews = await interviewRes.json();
//   const companies = await companyRes.json();

//   const now = new Date().toISOString();

//   // =========================
//   // 🔥 SLUG HELPERS
//   // =========================
//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/&nbsp;|\\u00a0/g, " ")
//       .replace(/[^a-z0-9\s]/g, " ")
//       .replace(/\s+/g, "-")
//       .replace(/^-|-$/g, "");

//   const createTopicSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .replace(/&nbsp;|\\u00a0/g, " ")
//       .replace(/<[^>]*>/g, "")
//       .replace(/^\d+[a-z]?[_-]?/i, "")
//       .replace(/[^a-z0-9\s]/g, " ")
//       .trim()
//       .replace(/\s+/g, "_")
//       + ".htm";

//   // =========================
//   // 🔹 STATIC PAGES
//   // =========================
//   const staticRoutes = [
//     {
//       url: `${baseUrl}`,
//       lastModified: now,
//       changeFrequency: "daily",
//       priority: 1
//     },
//     {
//       url: `${baseUrl}/notes`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     },
//     {
//       url: `${baseUrl}/interview`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     },
//     {
//       url: `${baseUrl}/company`,
//       lastModified: now,
//       changeFrequency: "weekly",
//       priority: 0.9
//     }
//   ];

//   // =========================
//   // 🔹 NOTES + TOPICS
//   // =========================
//   const noteRoutes = [];

//   for (const note of notes) {
//     const noteSlug = createSlug(note.title);

//     noteRoutes.push({
//       url: `${baseUrl}/notes/${noteSlug}`,
//       lastModified: note.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:8086/api/txtnotes/${note.noteId}/topics`
//       );

//       const topics = await res.json();

//       for (const t of topics) {
//         noteRoutes.push({
//           url: `${baseUrl}/notes/${noteSlug}/${createTopicSlug(t.topicName)}`,
//           lastModified: t.updatedAt || now,
//           changeFrequency: "monthly",
//           priority: 0.7
//         });
//       }
//     } catch (e) {
//       console.error("Notes topic error:", e);
//     }
//   }

//   // =========================
//   // 🔹 INTERVIEW + QUESTIONS
//   // =========================
//   const interviewRoutes = [];

//   for (const subject of interviews) {
//     const subjectSlug = createSlug(subject.subjectName);

//     interviewRoutes.push({
//       url: `${baseUrl}/interview/${subjectSlug}`,
//       lastModified: subject.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:8086/api/interview-txt/subjects/${subject.subjectId}/questions`
//       );

//       const questions = await res.json();

//       for (const q of questions) {
//         interviewRoutes.push({
//           url: `${baseUrl}/interview/${subjectSlug}/${createTopicSlug(q.question)}`,
//           lastModified: q.updatedAt || now,
//           changeFrequency: "monthly",
//           priority: 0.7
//         });
//       }
//     } catch (e) {
//       console.error("Interview error:", e);
//     }
//   }

//   // =========================
//   // 🔹 COMPANY + ROUNDS
//   // =========================
//   const companyRoutes = [];

//   for (const company of companies) {
//     companyRoutes.push({
//       url: `${baseUrl}/company/${company.id}/rounds`,
//       lastModified: company.updatedAt || now,
//       changeFrequency: "monthly",
//       priority: 0.8
//     });
//   }

//   // =========================
//   // 🔥 FINAL RETURN
//   // =========================
//   return [
//     ...staticRoutes,
//     ...noteRoutes,
//     ...interviewRoutes,
//     ...companyRoutes
//   ];
// }





export const dynamic = "force-dynamic";

const baseUrl = "https://csenotes.com";
const API_BASE = "https://csenotes.com"; 

export default async function sitemap() {
  let notes = [];
  let interviews = [];
  let companies = [];

  const now = new Date().toISOString();

  try {
    const [notesRes, interviewRes, companyRes] = await Promise.all([
      fetch(`${API_BASE}/api/api/txtnotes`, { cache: "no-store" }),
      fetch(`${API_BASE}/interview-txt/subjects`, { cache: "no-store" }),
      fetch(`${API_BASE}/company-txt/companies`, { cache: "no-store" }),
    ]);

    if (notesRes.ok) notes = await notesRes.json();
    if (interviewRes.ok) interviews = await interviewRes.json();
    if (companyRes.ok) companies = await companyRes.json();

    console.log("✅ NOTES:", notes.length);
    console.log("✅ INTERVIEWS:", interviews.length);
    console.log("✅ COMPANIES:", companies.length);
  } catch (err) {
    console.error("❌ Main API error:", err);
  }

  // =========================
  // 🔥 SLUG FUNCTIONS
  // =========================
  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/&nbsp;|\\u00a0/g, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-|-$/g, "");

  const createTopicSlug = (text) =>
    text
      ?.toLowerCase()
      .replace(/&nbsp;|\\u00a0/g, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/^\d+[a-z]?[_-]?/i, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/^-|-$/g, "");

  // =========================
  // 🔹 STATIC ROUTES
  // =========================
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/interview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/company`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // =========================
  // 🔥 NOTES + TOPICS
  // =========================
  for (const note of notes) {
    const title = note.title || note.name || note.subject;
    const noteId = note.noteId || note.id;

    if (!title || !noteId) continue;

    const noteSlug = createSlug(title);

    routes.push({
      url: `${baseUrl}/notes/${noteSlug}`,
      lastModified: note.updatedAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    try {
      const res = await fetch(
        `${API_BASE}/txtnotes/${noteId}/topics`,
        { cache: "no-store" }
      );

      if (!res.ok) continue;

      const topics = await res.json();

      console.log(`📘 Topics for note ${noteId}:`, topics.length);

      for (const t of topics) {
        const topicName = t.topicName || t.name;
        if (!topicName) continue;

        routes.push({
          url: `${baseUrl}/notes/${noteSlug}/${createTopicSlug(topicName)}`,
          lastModified: t.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error("❌ Topic error:", e);
    }
  }

  // =========================
  // 🔥 INTERVIEW + QUESTIONS
  // =========================
  for (const subject of interviews) {
    const subjectName = subject.subjectName;
    const subjectId = subject.subjectId;

    if (!subjectName || !subjectId) continue;

    const subjectSlug = createSlug(subjectName);

    routes.push({
      url: `${baseUrl}/interview/${subjectSlug}`,
      lastModified: subject.updatedAt || now,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    try {
      const res = await fetch(
        `${API_BASE}/interview-txt/subjects/${subjectId}/questions`,
        { cache: "no-store" }
      );

      if (!res.ok) continue;

      const questions = await res.json();

      console.log(`🎤 Questions for subject ${subjectId}:`, questions.length);

      for (const q of questions) {
        if (!q?.question) continue;

        routes.push({
          url: `${baseUrl}/interview/${subjectSlug}/${createTopicSlug(q.question)}`,
          lastModified: q.updatedAt || now,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    } catch (e) {
      console.error("❌ Interview error:", e);
    }
  }

  // =========================
  // 🔥 COMPANY
  // =========================
  for (const company of companies) {
    if (!company?.id) continue;

    routes.push({
      url: `${baseUrl}/company/${company.id}/rounds`,
      lastModified: company.updatedAt || now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // =========================
  // 🔥 REMOVE DUPLICATES
  // =========================
  const uniqueRoutes = Array.from(
    new Map(routes.map((item) => [item.url, item])).values()
  );

  console.log("🚀 TOTAL ROUTES:", uniqueRoutes.length);

  return uniqueRoutes;
}