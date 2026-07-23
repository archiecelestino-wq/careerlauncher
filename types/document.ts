export type SupportedFileType = "pdf" | "docx" | "txt";

export interface ParsedDocument {
  fileName: string;
  fileType: SupportedFileType;
  text: string;
}