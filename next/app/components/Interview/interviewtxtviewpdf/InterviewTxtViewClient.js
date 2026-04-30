"use client";

import styles from "./InterviewTxtViewPdfPage.module.css";
import InterviewPdfDownloadButton from "./InterviewPdfDownloadButton";

// Content formatter: remove <p>, keep line breaks
const formatContent = (html) => {
  if (!html) return "";

  let formatted = html;
  formatted = formatted.replace(/<\/?p>/g, "");
  formatted = formatted.replace(
    /href="(?!https?:\/\/)(.*?)"/g,
    'href="https://$1"'
  );

  return formatted;
};

export default function InterviewTxtPdfPage({ subjectName, questions }) {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>

        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1>{subjectName}</h1>
          <InterviewPdfDownloadButton subjectName={subjectName} />
        </div>

        {/* Preview Area */}
        <div className={styles.previewWrapper}>
          <div id="pdfContent" className={styles.pdfPage}>
            <div className={styles.pageHeader}>{subjectName}</div>

            {questions.map((q, index) => (
              <div key={q.questionId} className={styles.topicWrapper}>
                <div className={styles.topicWrapper}>
  <div className={styles.question}>
    {/* {index + 1}. */}
     <span dangerouslySetInnerHTML={{ __html: formatContent(q.question) }} />
  </div>
  <div className={styles.answer} dangerouslySetInnerHTML={{ __html: formatContent(q.answer) }} />
</div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}