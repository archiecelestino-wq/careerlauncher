export async function parsePdfFile(file: File): Promise<string> {
  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    }).promise;

    const pages: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .trim();

      if (pageText) {
        pages.push(pageText);
      }
    }

    const text = pages.join("\n\n").trim();

    if (!text) {
      throw new Error(
        "The PDF does not contain readable text. It may be a scanned document.",
      );
    }

    return text;
  } catch (error) {
    console.error("PDF parsing error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to read the PDF document.",
    );
  }
}