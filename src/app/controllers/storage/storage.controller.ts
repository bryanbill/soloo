import {
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
import { extractFileType } from "../../../utils/types";
import { Storage, User } from "../../entities";
import { FileService } from "../../services";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class StorageController {
  @Get("/")
  getFiles(ctx: Context) {
    return new HttpResponseOK();
  }
  @Post("/")
  @ValidateMultipartFormDataBody({
    files: {
      file: { required: true },
    },
  })
  async uploadFile(ctx: Context) {
    const fileServce = new FileService();
    const file = ctx.request.files.file;

    try {
      const filePath = await fileServce.createFile(
        file,
        extractFileType(file.name)
      );

      const result = await Storage.create({
        username: ctx.user.username,
        path: filePath,
        type: extractFileType(file.name),
        name: file.name,
        size: file.size,
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
        isPublic: true,
        isDeleted: false,
      }).save();
      if (result) {
        return new HttpResponseOK();
      }
      return new HttpResponseBadRequest();
    } catch (error) {
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
}
