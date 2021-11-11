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
export const extractFileType = (fileName: string) => {
  const fileType = fileName.split(".");
  const fileExtension = fileType[fileType.length - 1];
  switch (fileExtension) {
    case "mp4" || "webm" || "ogg" || "avi":
      return "Video";
    case "mp3" || "wav" || "ogg" || "flac":
      return "Audio";
    case "jpg" || "jpeg" || "png" || "gif" || "bmp":
      return "Image";
    case "pdf" ||
      "docx" ||
      "doc" ||
      "ppt" ||
      "pptx" ||
      "xls" ||
      "xlsx" ||
      "txt" ||
      "csv" ||
      "rtf" ||
      "odt" ||
      "ods" ||
      "odp" ||
      "odg" ||
      "odf" ||
      "odb" ||
      "odm" ||
      "ott" ||
      "ots" ||
      "ots" ||
      "otp" ||
      "otg" ||
      "odc" ||
      "odf" ||
      "odft":
      return "Document";

    default:
      return "Others";
  }
};
