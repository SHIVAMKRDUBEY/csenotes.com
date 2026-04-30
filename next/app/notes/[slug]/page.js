import NotesTxtView from "@/app/components/notes/notestxtview/NotesTxtView";
import API_BASE_URL from "@/app/config";
//import { createSlug, normalizeSlug } from "@/utils/slug";
import { createSlug, normalizeSlug, createTopicSlug } from "@/utils/slug";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = normalizeSlug(slug);

  try {
    const res = await fetch(`${API_BASE_URL}/api/txtnotes`, {
      next: { revalidate: 3600 },
    });
    const allNotes = await res.json();

    const matchedNote = allNotes.find(
      (n) => createSlug(n.title) === cleanSlug
    );

    if (!matchedNote) {
      return {
        title: "CSE Notes | CSENOTES",
        description: "Computer Science Engineering Notes",
      };
    }

    return {
      title: `${matchedNote.title} - Complete Notes & PDF Download | CSENOTES`,
      description: `Read detailed notes on ${matchedNote.title} with clear explanations, examples and important topics.`,
      keywords: ["CSE notes", matchedNote.title, "engineering notes", "B.Tech notes"],
      alternates: {
        canonical: `https://csenotes.com/notes/${cleanSlug}`,
      },
      openGraph: {
        title: `${matchedNote.title} - Complete Notes`,
        description: `Detailed study material and notes for ${matchedNote.title}`,
        url: `https://csenotes.com/notes/${cleanSlug}`,
        type: "article",
      },
    };
  } catch (err) {
    return {
      title: "CSE Notes | CSENOTES",
      description: "Free Computer Science Engineering Notes",
    };
  }
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const { topicId } = await searchParams;

  const cleanSlug = normalizeSlug(slug);

  let notetxtId = null;
  let notes = [];
  let topics = [];

  // Step 1: Get all notes to find noteId from slug
  try {
    const resNotes = await fetch(`${API_BASE_URL}/api/txtnotes`, {
      next: { revalidate: 3600 },
    });
    const jsonNotes = await resNotes.json();
    notes = Array.isArray(jsonNotes) ? jsonNotes : [];

    const matchedNote = notes.find((n) => createSlug(n.title) === cleanSlug);
    notetxtId = matchedNote?.noteId;
  } catch (err) {
    console.error("Error fetching notes list:", err);
  }

  if (!notetxtId) {
    return <div style={{ padding: "40px", textAlign: "center" }}>❌ Note not found</div>;
  }

try {
  const resTopics = await fetch(
    `${API_BASE_URL}/api/txtnotes/${notetxtId}/topics`,
    { next: { revalidate: 3600 } }
  );

  const jsonTopics = await resTopics.json();
  const topicsData = Array.isArray(jsonTopics) ? jsonTopics : jsonTopics.topics || [];

  topics = topicsData.map((t) => ({
    ...t,
    cleanTopicName: stripHtml(t.topicName || t.name),
  }));

} catch (err) {
  console.error("Error fetching topics:", err);
}

// ✅ ALWAYS run (safe place)
if (!topicId && topics.length > 0) {
  const firstTopicSlug = createTopicSlug(
    topics[0].topicName || topics[0].name
  );

  redirect(`/notes/${cleanSlug}/${firstTopicSlug}`);
}

  return (
    <NotesTxtView
      notes={notes}
      topics={topics}
      notetxtId={notetxtId}
      topicId={topicId}
    />
  );
}

// Helper function (same file me rakh sakte ho)
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}