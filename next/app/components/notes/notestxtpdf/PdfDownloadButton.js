"use client";

import styles from "./NotesTxtPdfPage.module.css";

export default function PdfDownloadButton({ noteTitle }) {

  const downloadPDF = async () => {
    const element = document.getElementById("pdfContent");
    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: [10, 10, 15, 10],
      filename: `${noteTitle}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const footerText = "csenotes.com";
        const url = "https://csenotes.com";

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // Page number
          pdf.setFontSize(9);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 25, pageHeight - 8);

          // Footer link
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 255);
          const textWidth = pdf.getTextWidth(footerText);
          const x = (pageWidth - textWidth) / 2;
          const y = pageHeight - 8;
          pdf.textWithLink(footerText, x, y, { url });
        }
      })
      .save();
  };

  // Go Back function
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button className={styles.downloadBtn} onClick={downloadPDF}>
        Download PDF
      </button>

      <button className={styles.backBtn} onClick={goBack}>
        Go Back
      </button>
    </div>
  );
}