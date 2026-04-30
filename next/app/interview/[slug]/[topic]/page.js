// import API_BASE_URL from "@/app/config";
// import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
// import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtview/InterviewTxtViewClient";

// export default async function Page({ params }) {
//   const { slug, topic } = await params;

//   const cleanSlug = normalizeSlug(slug);

//   let subjects = [];
//   let txtId = null;
//   let topics = [];
//   let selectedIndex = 0;

//   // 1. fetch subjects
//   const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`);
//   subjects = await res.json();

//   const matched = subjects.find(
//     (s) => createSlug(s.subjectName) === cleanSlug
//   );

//   if (!matched) return <div>❌ Subject not found</div>;

//   txtId = matched.subjectId;

//   // 2. fetch questions
//   const res2 = await fetch(
//     `${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`
//   );

//   const raw = await res2.json();

//   topics = raw.map((q) => ({
//     topicId: q.questionId,
//     questionText: q.question,
//     content: q.answer || "<p>No answer available</p>",
//     slug: createTopicSlug(q.question),   // 🔥 IMPORTANT
//   }));

//   // 3. match topic from URL
//   const idx = topics.findIndex((t) => t.slug === topic);
//   if (idx !== -1) selectedIndex = idx;

//   return (
//     <InterviewTxtViewClient
//       interviews={subjects}
//       topics={topics}
//       txtId={txtId}
//       initialTopicIndex={selectedIndex}
//     />
//   );
// }





import API_BASE_URL from "@/app/config";
import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtview/InterviewTxtViewClient";

// ✅ SEO METADATA (VERY IMPORTANT FOR GOOGLE)
export async function generateMetadata({ params }) {
  const { slug, topic } = await params;

  const cleanSlug = normalizeSlug(slug);

  return {
    title: `${cleanSlug} Interview Questions | ${topic}`,
    description: `Prepare ${cleanSlug} interview questions and answers. Topic: ${topic}. Best guide for interview preparation.`,
    keywords: `${cleanSlug}, interview questions, ${topic}, interview preparation`,
    openGraph: {
      title: `${cleanSlug} Interview Questions`,
      description: `Learn ${cleanSlug} interview Q&A`,
      type: "article",
    },
  };
}

export default async function Page({ params }) {
  // ✅ Next.js 16 FIX (params is Promise)
  const { slug, topic } = await params;

  const cleanSlug = normalizeSlug(slug);

  let subjects = [];
  let txtId = null;
  let topics = [];
  let selectedIndex = 0;

  // ✅ CACHE (SEO + SPEED BOOST)
  const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
    next: { revalidate: 3600 }, // 1 hour ISR
  });

  subjects = await res.json();

  // ✅ SAFE SLUG MATCHING
  const matched = subjects.find((s) => {
    const subjectSlug = createSlug(s.subjectName);
    return subjectSlug === cleanSlug;
  });

  if (!matched) {
    return (
      <div>
        <h1>Subject Not Found</h1>
        <p>Requested: {cleanSlug}</p>
      </div>
    );
  }

  txtId = matched.subjectId;

  // ✅ QUESTIONS FETCH (SEO CACHE)
  const res2 = await fetch(
    `${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`,
    {
      next: { revalidate: 3600 },
    }
  );

  const raw = await res2.json();

  topics = raw.map((q) => ({
    topicId: q.questionId,
    questionText: q.question,
    content: q.answer || "<p>No answer available</p>",
    slug: createTopicSlug(q.question),
  }));

  const idx = topics.findIndex((t) => t.slug === topic);
  if (idx !== -1) selectedIndex = idx;

  return (
    <main>
      {/* ✅ SEO STRUCTURE */}
      <article>
        {/* <h1>{matched.subjectName} Interview Questions</h1> */}

        <InterviewTxtViewClient
          interviews={subjects}
          topics={topics}
          txtId={txtId}
          initialTopicIndex={selectedIndex}
        />
      </article>
    </main>
  );
}