export async function parseTxtFile(file: File): Promise<string> {
  try {
    const text = await file.text();

    if (!text.trim()) {
      throw new Error("The text file is empty.");
    }

    return text.trim();
  } catch (error) {
    console.error("TXT parsing error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to read the text file."
    );
  }
}