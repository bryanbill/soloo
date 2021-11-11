import {
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
  Post,
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
      return new HttpResponseBadRequest(error);
    }
  }
}
