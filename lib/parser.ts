import { parseDocxFile } from "./docxParser";
import { parsePdfFile } from "./pdfParser";
import { parseTxtFile } from "./txtParser";
import type {
  ParsedDocument,
  SupportedFileType,
} from "@/types/document";

const supportedFileTypes: SupportedFileType[] = [
  "pdf",
  "docx",
  "txt",
];

function getFileExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() ?? "" : "";
}

export async function parseDocument(
  file: File
): Promise<ParsedDocument> {
  const extension = getFileExtension(file.name);

  if (
    !supportedFileTypes.includes(
      extension as SupportedFileType
    )
  ) {
    throw new Error(
      "Unsupported file type. Please upload a PDF, DOCX, or TXT file."
    );
  }

  const fileType = extension as SupportedFileType;

  let text: string;

  switch (fileType) {
    case "pdf":
      text = await parsePdfFile(file);
      break;

    case "docx":
      text = await parseDocxFile(file);
      break;

    case "txt":
      text = await parseTxtFile(file);
      break;

    default:
      throw new Error("Unable to determine the file type.");
  }

  return {
    fileName: file.name,
    fileType,
    text,
  };
}