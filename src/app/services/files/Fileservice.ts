import { Readable } from "stream";

import { dependency } from "@foal/core";
import { Disk } from "@foal/storage";
import { FileTypes } from "../../../utils/types";
class FileService {
  @dependency
  disk: Disk;
  /**
   * Reads the file at the given path.
   * @param path
   * @returns file
   */
  async readFile(path: string) {
    const file = this.disk.read(path, "buffer");
    return file;
  }
  /**
   * Creates a new file from the given content
   * @param content
   * @returns
   */
  async createFile(content: Buffer | Readable, type: FileTypes) {
    const { path } = await this.disk.write(type.path, content);
    return path;
  }

  /**
   * Delete the file at the given path.
   * @param path
   * @returns
   */
  async deleteFile(path: string) {
    const stat = this.disk
      .delete(path)
      .then(() => true)
      .catch(() => false);

    return await stat;
  }
}
