import styles from "./NotesTxtPdfPage.module.css";
import PdfDownloadButton from "./PdfDownloadButton";

export default function NotesTxtPdfPage({
  noteTitle,
  topics,
}) {
const formatContent = (html) => {
  if (!html) return "";

  // Image URL detect karne ka regex
  const imageRegex =
    /(https?:\/\/[^\s"'<>]+?\.(?:png|jpg|jpeg|gif|webp))/gi;

  return html.replace(imageRegex, (match, offset, fullString) => {
    // Match ke pehle character check karo
    const prevChar = fullString[offset - 1];
    const nextChar = fullString[offset + match.length];

    let cleanUrl = match.trim();

    // Agar URL ke pehle '>' ya extra space hai, hata do
    if (prevChar === ">") cleanUrl = cleanUrl.replace(/^>+/, "");

    // Agar URL ke baad '>' hai, hata do
    if (nextChar === ">") cleanUrl = cleanUrl.replace(/>+$/, "");

    return `<img src="${cleanUrl}" />`;
  });
};

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <h1>{noteTitle}</h1>

          {/* Client Button */}
          <PdfDownloadButton noteTitle={noteTitle} />
        </div>

        {/* Preview Area */}
        <div className={styles.previewWrapper}>
          <div
            id="pdfContent"
            className={styles.pdfPage}
          >
            <div className={styles.pageHeader}>
              {noteTitle}
            </div>

            {topics.map((t, index) => (
              <div
                key={t.topicId}
                className={styles.topicWrapper}
              >
                <div className={styles.question}>
                  {/* {index + 1}.  */}
                  {t.topicName}
                </div>

                <div
                  className={styles.answer}
                  dangerouslySetInnerHTML={{
                    __html: formatContent(
                      t.content
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
