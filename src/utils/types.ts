import { type } from "os";

export type FileType = (
  type: "Video" | "Audio" | "Image" | "Document" | "Others"
) => string;

export const fileType: FileType = (type) => {
  let path: string;
  switch (type) {
    case "Video":
      path = "videos";
      break;
    case "Audio":
      path = "audios";
      break;
    case "Image":
      path = "images";
      break;
    case "Document":
      path = "documents";
      break;
    default:
      path = "others";
      break;
  }
  return path;
};
