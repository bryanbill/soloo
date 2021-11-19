import { Readable } from "stream";

import { dependency } from "@foal/core";
import { LocalDisk } from "@foal/storage";
import { FileType, fileType } from "../../../utils/types";
export class FileService {
  @dependency
  disk: LocalDisk;

  constructor() {
    this.disk = new LocalDisk();
  }

  /**
   * Reads the file at the given path.
   * @param path
   * @returns file
   */
  async readFile(path: string) {
    const file = this.disk.read(path, "buffer");
    return file;
  }

  downloadFile(path: string, name: string) {
    return this.disk.createHttpResponse(path, {
      forceDownload: true,
      filename: name,
    });
  }

  /**
   * Creates a new file from the given content
   * @param content
   * @returns
   */
  public createFile = async (content: Buffer | Readable, type: string) => {
    const { path } = await this.disk.write(fileType(type), content);
    return path;
  };

  /**
   * Delete the file at the given path.
   * @param path
   * @returns
   */
  async deleteFile(path: string): Promise<boolean> {
    const stat = await this.disk
      .delete(path)
      .then(() => true)
      .catch(() => false);

    return stat;
  }

  public test = () => {
    const path = this.createFile(Buffer.from("test"), fileType("Others")).then(
      async (path) => {
        return await this.readFile(path);
      }
    );
    return path;
  };
}
