import {
  Context,
  Get,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { Storage, User } from "../../entities";
import { FileService } from "../../services";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class StorageController {
  @Get("/")
  async getFiles(ctx: Context) {
    const result = await Storage.find({ username: ctx.user.username });

    return new HttpResponseOK(result);
  }
  @Post("/")
  @ValidateBody({
    properties: {
      file: { type: "file" },
      type: { type: "string" },
    },
  })
  async uploadFile(ctx: Context) {
    const { file, type } = ctx.request.body;
    const { username } = ctx.user;

    const storage = new Storage();
    storage.username = username;

    storage.path = await new FileService().createFile(file, type);

    await storage.save();

    return new HttpResponseOK(storage);
  }
}
