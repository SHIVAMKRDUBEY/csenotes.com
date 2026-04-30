import NotesTxtPdfPage from "@/app/components/notes/notestxtpdf/NotesTxtPdfPage";
import API_BASE_URL from "@/app/config";

async function getNoteData(noteId) {
  const [noteRes, topicsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/api/txtnotes/${noteId}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`${API_BASE_URL}/api/txtnotes/${noteId}/topics`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!noteRes.ok || !topicsRes.ok) {
    throw new Error("Failed to fetch note data");
  }

  const note = await noteRes.json();
  const topics = await topicsRes.json();

  return {
    noteTitle: note.title,
    topics: Array.isArray(topics) ? topics : topics.topics || [],
  };
}

export default async function PdfPage({ searchParams }) {
  const params = await searchParams;
  const noteId = params?.noteId;

  if (!noteId) {
    return <div>Note ID is missing</div>;
  }

  let data;
  try {
    data = await getNoteData(noteId);
  } catch (err) {
    return <div>Error loading note. Please try again later.</div>;
  }

  return (
    <NotesTxtPdfPage
      noteTitle={data.noteTitle}
      topics={data.topics}
    />
  );
}