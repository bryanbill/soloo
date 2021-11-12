import {
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { ValidateMultipartFormDataBody } from "@foal/storage";
import { fetchUser } from "@foal/typeorm";
import { User, Appcenter } from "../../entities";
import { FileService } from "../../services";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class AppcenterController {
  @Get("/")
  async getApps(ctx: Context) {
    const result = await Appcenter.find();

    return new HttpResponseOK(result);
  }

  @Post("/")
  @ValidateMultipartFormDataBody({
    files: {
      app: {
        required: true,
      },
    },
    
  })
  async createApp(ctx: Context) {
    if (ctx.user.role !== "developer") {
      return new HttpResponseUnauthorized(
        "You are not authorized to create an app"
      );
    }

    // Upload the app to the server.
    const fileServce = new FileService();
    const path = await fileServce.createFile(ctx.request.files.app, "Others");
    const app = Appcenter.create({
      name: ctx.request.body.name,
      username: ctx.user.username,
      description: ctx.request.body.description,
      url: path,
    });
    return new HttpResponseOK();
  }
}
