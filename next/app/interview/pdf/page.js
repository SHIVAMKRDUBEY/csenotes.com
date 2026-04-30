// import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtviewpdf/InterviewTxtViewClient";
// import API_BASE_URL from "@/app/config";

// export default async function PdfPage({ searchParams }) {
//   const params = await searchParams;
//   const txtId = params?.txtId;

//   if (!txtId) return <div>Subject ID missing</div>;

//   const resSubject = await fetch(
//     `${API_BASE_URL}/api/interview-txt/subjects/${txtId}`,
//     { cache: "no-store" }
//   );

//   const subject = await resSubject.json();

//   const resQuestions = await fetch(
//     `${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`,
//     { cache: "no-store" }
//   );

//   const questions = await resQuestions.json();

//   return (
//     <InterviewTxtViewClient
//       subjectName={subject?.subjectName}
//       questions={questions || []}
//     />
//   );
// }




// PDF Page
import InterviewTxtViewClient from "@/app/components/Interview/interviewtxtviewpdf/InterviewTxtViewClient";
import API_BASE_URL from "@/app/config";

export default async function PdfPage({ searchParams }) {
  const params = await searchParams;
  const txtId = params?.txtId;

  if (!txtId) return <div>Subject ID is missing</div>;

  const [subjectRes, questionsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/api/interview-txt/subjects/${txtId}`, { 
      next: { revalidate: 3600 } 
    }),
    fetch(`${API_BASE_URL}/api/interview-txt/subjects/${txtId}/questions`, { 
      next: { revalidate: 3600 } 
    }),
  ]);

  const subject = await subjectRes.json();
  const questions = await questionsRes.json();

  return (
    <InterviewTxtViewClient
      subjectName={subject?.subjectName}
      questions={questions || []}
    />
  );
}