import { type } from "os";

export type FileType = (
  type: "Video" | "Audio" | "Image" | "Document" | "Unknown"
) => string;

export const fileType: FileType = (type) => {
  let path: string;
  switch (type) {
    case "Video":
      path = "video";
      break;
    case "Audio":
      path = "audio";
      break;
    case "Image":
      path = "image";
      break;
    case "Document":
      path = "document";
      break;
    default:
      path = "unknown";
      break;
  }
  return path;
};
