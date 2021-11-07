import {
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  ValidateBody,
} from "@foal/core";
import { User } from "../../entities";
import { credentialsSchema } from "./schemas";

export class AuthController {
  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context) {
    const username = ctx.request.body.username;

    const result = await User.findOne({ username: username });
    if (result) {
      const phone = result.phone;
      ctx.session!.setUser(result);
      ctx.user = result;

      return new HttpResponseOK(result);
    } else {
      return new HttpResponseUnauthorized();
    }
  }
  @Post("/register")
  async register(ctx: Context) {
    const user = new User();
    const { name, phone, email, username } = ctx.request.body;
    console.log(ctx.request.body);
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.username = username;
    user.createdAt = new Date(Date.now());
    user.updatedAt = new Date(Date.now());
    const result = await user.save();
    if (result) {
      return new HttpResponseOK({
        created: true,
      });
    } else {
      return new HttpResponseBadRequest({
        created: false,
      });
    }
  }
  @Post("/check-username")
  async checkUsername(ctx: Context) {
    const username = ctx.request.body.username;
    const result = await User.findOne({ username: username });
    if (result) {
      return new HttpResponseOK({
        isAvailable: true,
      });
    } else {
      return new HttpResponseBadRequest({
        isAvailable: false,
      });
    }
  }
}
