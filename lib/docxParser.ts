import mammoth from "mammoth";

export async function parseDocxFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    const text = result.value.trim();

    if (!text) {
      throw new Error("The Word document does not contain readable text.");
    }

    return text;
  } catch (error) {
    console.error("DOCX parsing error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to read the Word document."
    );
  }
}