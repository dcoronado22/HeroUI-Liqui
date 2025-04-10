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
  occupation: any;
  newsletter: boolean | undefined;
  address: string | (readonly string[] & string) | undefined;
  dateOfBirth: any;
  email: string | (readonly string[] & string) | undefined;
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
