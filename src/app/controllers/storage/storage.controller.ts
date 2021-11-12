import {
  ApiUseTag,
  Context,
  Delete,
  Get,
  HttpResponseBadRequest,
  HttpResponseInternalServerError,
  HttpResponseOK,
  Post,
  ValidatePathParam,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { ValidateMultipartFormDataBody } from "@foal/storage";
import { fetchUser } from "@foal/typeorm";
import { extractFileType, fileType } from "../../../utils/types";
import { Storage, User } from "../../entities";
import { FileService } from "../../services";

@ApiUseTag("Storage")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class StorageController {
  @Get("/")
  async getFiles(ctx: Context) {
    const result = await Storage.find();
    return new HttpResponseOK(result);
  }

  @Get("/test")
  test() {
    const fileServce = new FileService();

    const path = fileServce.test();

    return new HttpResponseOK({ path });
  }

  @Post("/")
  @ValidateMultipartFormDataBody({
    files: {
      file: {
        required: true,
      },
    },
  })
  async uploadFile(ctx: Context) {
    const fileServce = new FileService();

    const { buffer, filename, mimeType } = ctx.request.body.files.file;
    const fileType = extractFileType(mimeType);
    try {
      const filePath = await fileServce.createFile(buffer, fileType);

      const result = await Storage.create({
        username: ctx.user.username,
        path: filePath,
        type: fileType,
        name: filename,
        size: buffer.length * 0.000001,
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
        isPublic: true,
        isDeleted: false,
      }).save();
      if (result) {
        return new HttpResponseOK(result);
      }
      return new HttpResponseBadRequest();
    } catch (error) {
      console.log(error);
      return new HttpResponseInternalServerError(error);
    }
  }
  @Delete("/")
  @ValidatePathParam("fileId", { type: "number" })
  async deleteFile(ctx: Context) {
    const fileServce = new FileService();
    const fileId = ctx.request.params.fileId;
    const file = await Storage.findOne(fileId);

    const result = await fileServce.deleteFile(file!.path).then(async (d) => {
      return await Storage.update(fileId, { isDeleted: d });
    });

    if (result.affected) {
      return new HttpResponseOK({
        message: "File deleted successfully",
      });
    }
    return new HttpResponseBadRequest({
      message: "File not found",
    });
  }

  @Get("/:fileId/download")
  @ValidatePathParam("fileId", { type: "number" })
  async downloadFile(ctx: Context) {
    const fileId = ctx.request.params.fileId;
    const file = await Storage.findOne(fileId);
    if (file) {
      const fileServce = new FileService();
      const response = await fileServce.downloadFile(file.path, file.name);
      return response;
    }
    return new HttpResponseBadRequest({
      message: "File not found",
    });
  }
}
