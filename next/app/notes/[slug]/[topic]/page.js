// import API_BASE_URL from "@/app/config";
// import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
// import NotesTxtView from "@/app/components/notes/notestxtview/NotesTxtView";


// export default async function Page({ params }) {
//   const { slug, topic } = await params;

//   const cleanSlug = normalizeSlug(slug);

//   let notes = [];
//   let topics = [];
//   let notetxtId = null;
//   let selectedTopicIndex = 0;

//   const resNotes = await fetch(`${API_BASE_URL}/api/txtnotes`);
//   notes = await resNotes.json();

//   const matchedNote = notes.find(
//     (n) => createSlug(n.title) === cleanSlug
//   );

//   if (!matchedNote) return <div>❌ Note not found</div>;

//   notetxtId = matchedNote.noteId;

//   const resTopics = await fetch(
//     `${API_BASE_URL}/api/txtnotes/${notetxtId}/topics`
//   );

//   const data = await resTopics.json();

//   topics = data.map((t) => ({
//     ...t,
//     slug: createTopicSlug(t.topicName),
//   }));

//   // ✅ FIXED MATCHING
//   const idx = topics.findIndex(
//     (t) => createTopicSlug(t.topicName) === topic
//   );

//   if (idx !== -1) selectedTopicIndex = idx;

//   return (
//     <NotesTxtView
//       notes={notes}
//       topics={topics}
//       notetxtId={notetxtId}
//       initialTopicIndex={selectedTopicIndex}
//     />
//   );
// }








import API_BASE_URL from "@/app/config";
import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
import NotesTxtView from "@/app/components/notes/notestxtview/NotesTxtView";
import { notFound } from "next/navigation";

// ✅ SEO Metadata
export async function generateMetadata({ params }) {
  const { slug, topic } = await params;

  const cleanSlug = normalizeSlug(slug);

  return {
    title: `${cleanSlug} Notes | ${topic}`,
    description: `Read detailed notes for ${cleanSlug}. Topic: ${topic}. Best structured learning guide.`,
    openGraph: {
      title: `${cleanSlug} Notes`,
      description: `Study notes for ${cleanSlug}`,
      type: "article",
    },
  };
}

export default async function Page({ params }) {
  // ✅ Next.js 16 fix
  const { slug, topic } = await params;

  const cleanSlug = normalizeSlug(slug);

  let notes = [];
  let topics = [];
  let notetxtId = null;
  let selectedTopicIndex = 0;

  // ✅ Cache for SEO + speed
  const resNotes = await fetch(`${API_BASE_URL}/api/txtnotes`, {
    next: { revalidate: 3600 },
  });

  notes = await resNotes.json();

  // ✅ safe slug match
  const matchedNote = notes.find(
    (n) => createSlug(n.title) === cleanSlug
  );

  if (!matchedNote) {
    notFound(); // ✅ SEO clean 404
  }

  notetxtId = matchedNote.noteId;

  const resTopics = await fetch(
    `${API_BASE_URL}/api/txtnotes/${notetxtId}/topics`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data = await resTopics.json();

  topics = data.map((t) => ({
    ...t,
    slug: createTopicSlug(t.topicName),
  }));

  // ✅ topic match
  const idx = topics.findIndex(
    (t) => t.slug === topic
  );

  if (idx !== -1) selectedTopicIndex = idx;

  return (
    <main>
      <article>
        <h1>{matchedNote.title} Notes</h1>

        <NotesTxtView
          notes={notes}
          topics={topics}
          notetxtId={notetxtId}
          initialTopicIndex={selectedTopicIndex}
        />
      </article>
    </main>
  );
}