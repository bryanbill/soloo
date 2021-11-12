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
export const extractFileType = (mimeType: string) => {
  if (mimeType.includes("video")) {
    return "videos";
  } else if (mimeType.includes("audio")) {
    return "audios";
  } else if (mimeType.includes("image")) {
    return "images";
  } else if (mimeType.includes("document")) {
    return "documents";
  } else {
    return "others";
  }
};
