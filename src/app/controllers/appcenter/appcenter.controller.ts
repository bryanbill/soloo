import {
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User, Appcenter } from "../../entities";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class AppcenterController {
  @Get("/")
  async getApps(ctx: Context) {
    const result = await Appcenter.find();

    return new HttpResponseOK(result);
  }

  @Post("/")
  async createApp(ctx: Context) {
    if (ctx.user.role !== "developer") {
      return new HttpResponseUnauthorized(
        "You are not authorized to create an app"
      );
    }
    const app = new Appcenter();
    app.name = ctx.request.body.name;
    app.description = ctx.request.body.description;
    app.username = ctx.user.username;
    app.createdAt = new Date();
    app.updatedAt = new Date();

    await app.save();

    return new HttpResponseOK(app);
  }
}
