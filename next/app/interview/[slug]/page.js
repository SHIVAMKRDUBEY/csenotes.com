// import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtview/InterviewTxtViewClient";
// import API_BASE_URL from "@/app/config";
// import { createSlug, normalizeSlug } from "@/utils/slug";

// // ✅ SEO METADATA
// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const cleanSlug = normalizeSlug(slug);

//   try {
//     const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
//       next: { revalidate: 3600 },
//     });

//     const subjects = await res.json();

//     const matched = subjects.find(
//       (s) => createSlug(s.subjectName) === cleanSlug
//     );

//     // ❌ अगर match नहीं मिला
//     if (!matched) {
//       return {
//         //title:  "Interview Questions and Answers & PDF | CSENOTES",
//         title: `${matched.subjectName} Interview Questions with Answers | CSENOTES`,
//         description:
//           "Explore top interview questions and answers for various technical subjects. Prepare effectively with detailed explanations and real-world examples.",
//         alternates: {
//           canonical: `https://csenotes.com/interview/${cleanSlug}`,
//         },
//       };
//     }

//     // ✅ SEO Optimized Metadata
//     return {
//       title: `${matched.subjectName} Interview Questions with Answers | CSENOTES`,
//       description: `Top ${matched.subjectName} interview questions and answers for freshers and experienced. Learn important concepts, examples, and real placement questions in simple language.`,
//       keywords: [
//         `${matched.subjectName} interview questions`,
//         `${matched.subjectName} viva questions`,
//         `${matched.subjectName} placement questions`,
//       ],
//       alternates: {
//         canonical: `https://csenotes.com/interview/${cleanSlug}`,
//       },
//     };
//   } catch (err) {
//     // ✅ SAFE FALLBACK (NO BUG)
//     return {
//       title: "Interview Questions and Answers | CSENOTES",
//       description:
//         "Top interview questions and answers for freshers and experienced. Prepare for technical interviews with detailed explanations and examples.",
//       alternates: {
//         canonical: `https://csenotes.com/interview/${cleanSlug}`,
//       },
//     };
//   }
// }

// // ✅ PAGE COMPONENT
// export default async function Page({ params, searchParams }) {
//      const { slug } = await params;
//    const { questionId } = await searchParams;

//   const cleanSlug = normalizeSlug(slug);

//   let interviews = [];
//   let txtId = null;

//   try {
//     const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
//       next: { revalidate: 3600 },
//     });

//     interviews = await res.json();

//     const matched = interviews.find(
//       (s) => createSlug(s.subjectName) === cleanSlug
//     );

//     txtId = matched?.subjectId;
//   } catch (err) {
//     console.error("Error fetching subjects:", err);
//   }

//   if (!txtId) {
//     return <div>Subject not found</div>;
//   }

//   let topics = [];

//   try {
//     const res = await fetch(
//       `${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`,
//       { next: { revalidate: 3600 } }
//     );

//     const raw = await res.json();

//     topics = raw.map((q) => ({
//       topicId: q.questionId,
//       questionText: q.question,
//       content: q.answer || "<p>No answer available</p>",
//       cleanTopicName: q.question,
//     }));
//   } catch (err) {
//     console.error("Error fetching questions:", err);
//   }

//   return (
//     <InterviewTxtViewClient
//       interviews={interviews}
//       topics={topics}
//       txtId={txtId}
//       questionId={questionId ? Number(questionId) : null}
//     />
//   );
// }




import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtview/InterviewTxtViewClient";
import API_BASE_URL from "@/app/config";
import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
import { redirect } from "next/navigation";

// ================= SEO METADATA =================
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = normalizeSlug(slug);

  try {
    const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
      next: { revalidate: 3600 },
    });

    const subjects = await res.json();

    const matched = subjects.find(
      (s) => createSlug(s.subjectName) === cleanSlug
    );

    if (!matched) {
      return {
        title: "Interview Questions and Answers | CSENOTES",
        description:
          "Explore top interview questions and answers for various technical subjects.",
        alternates: {
          canonical: `https://csenotes.com/interview/${cleanSlug}`,
        },
      };
    }

    return {
      title: `${matched.subjectName} Interview Questions with Answers | CSENOTES`,
      description: `Top ${matched.subjectName} interview questions and answers for freshers and experienced.`,
      keywords: [
        `${matched.subjectName} interview questions`,
        `${matched.subjectName} viva questions`,
        `${matched.subjectName} placement questions`,
      ],
      alternates: {
        canonical: `https://csenotes.com/interview/${cleanSlug}`,
      },
    };
  } catch (err) {
    return {
      title: "Interview Questions and Answers | CSENOTES",
      description:
        "Top interview questions and answers for freshers and experienced.",
    };
  }
}

// ================= PAGE COMPONENT =================
export default async function Page({ params }) {
  const { slug } = await params;

  const cleanSlug = normalizeSlug(slug);

  let interviews = [];
  let txtId = null;
  let topics = [];

  // ================= FETCH SUBJECTS =================
  try {
    const res = await fetch(`${API_BASE_URL}/api/interview-txt/subjects`, {
      next: { revalidate: 3600 },
    });

    interviews = await res.json();

    const matched = interviews.find(
      (s) => createSlug(s.subjectName) === cleanSlug
    );

    if (!matched) {
      return <div>Subject not found</div>;
    }

    txtId = matched.subjectId;
  } catch (err) {
    console.error("Error fetching subjects:", err);
  }

  // ================= FETCH QUESTIONS =================
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`,
      { next: { revalidate: 3600 } }
    );

    const raw = await res.json();

    // 👉 map to clean structure (NOTES STYLE)
    topics = raw.map((q) => ({
      topicId: q.questionId,
      questionText: q.question,
      content: q.answer || "<p>No answer available</p>",
      slug: createTopicSlug(q.question), // IMPORTANT
    }));
  } catch (err) {
    console.error("Error fetching questions:", err);
  }

  // ================= NOTES-STYLE AUTO REDIRECT =================
  if (topics.length > 0) {
    const firstSlug = topics[0].slug;

    redirect(`/interview/${cleanSlug}/${firstSlug}`);
  }

  // ================= RENDER =================
  return (
    <InterviewTxtViewClient
      interviews={interviews}
      topics={topics}
      txtId={txtId}
    />
  );
}