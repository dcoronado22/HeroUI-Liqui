import type { CalendarDate } from "@internationalized/date";

export type FileStatus = "valid" | "invalid" | "reviewing" | "pending";

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  url: string;
  status: FileStatus;
  uploadDate: Date;
}

export interface FormData {
  // Company Information
  rfc: string;
  companyName: string;
  phone: string;
  whatsapp: string;
  // Legal Representative
  firstName: string;
  lastName: string;
  secondLastName: string;
  privacyAccepted: boolean;
  // Files
  documents: FileInfo[];
}

export type FormStep = "company" | "video" | "documents";
