import {
  ApiUseTag,
  Context,
  Get,
  hashPassword,
  HttpResponseBadRequest,
  HttpResponseNoContent,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  Session,
  ValidateBody,
} from "@foal/core";
import { removeAuthCookie, setAuthCookie } from "@foal/jwt";
import { User } from "../../entities";
import { credentialsSchema } from "./schemas";
import { signToken } from "./tokenizer";

@ApiUseTag("auth")
export class AuthController {
  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context<User | undefined, Session>) {
    const username = ctx.request.body.username;

    const result = await User.findOne({ username: username });
    if (result) {
      const phone = result.phone;

      const token = signToken({
        id: result.id,
        sub: result.id.toString(),
        username: result.username,
      });

      const response = new HttpResponseOK({
        token: token,
      });
      // Do not forget the "await" keyword.
      await setAuthCookie(response, token);
      return response;
    } else {
      return new HttpResponseUnauthorized();
    }
  }
  @Post("/register")
  @ValidateBody({
    additionalProperties: false,
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: {
        type: "string",
      },
      username: {
        type: "string",
      },
    },
    required: ["phone", "username", "email", "name"],
    type: "object",
  })
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
    const result = await user.save().catch((err) => {
      console.log(err);
      return undefined;
    });
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
  @Post("/logout")
  async logout(ctx: Context<User | undefined, Session>) {
    const response = new HttpResponseNoContent();
    removeAuthCookie(response);
    return response;
  }
}
