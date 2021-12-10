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
  ValidatePathParam,
} from "@foal/core";
import { removeAuthCookie, setAuthCookie } from "@foal/jwt";
import { User } from "../../entities";
import { VerificationService } from "../../services";
import { credentialsSchema } from "./schemas";
import { signToken } from "./tokenizer";

@ApiUseTag("Auth")
export class AuthController {
  @Post("/login")
  @ValidateBody(credentialsSchema)
  async login(ctx: Context<User | undefined, Session>) {
    const username = ctx.request.body.username;

    const result = await User.findOne({ username: username });
    if (result) {
      const token = signToken({
        id: result!.id,
        sub: result!.id.toString(),
        username: result!.username,
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
    user.role = ["normal"];

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
  @Get("/:username")
  @ValidatePathParam("username", { type: "string" })
  async checkUsername(ctx: Context) {
    const username = ctx.request.params.username;
    const result = await User.findOne({ username: username });
    if (!result) {
      return new HttpResponseOK({
        isAvailable: true,
      });
    } else {
      return new HttpResponseOK({
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

  @Post("/verify-code")
  @ValidateBody({
    additionalProperties: false,
    properties: {
      code: { type: "string" },
      requestID: { type: "string" },
      username: { type: "string" },
    },
  })
  async verifyCode(ctx: Context<User | undefined, Session>) {
    const verificationService = new VerificationService();

    verificationService
      .verifyCode(ctx.request.body.requestID, ctx.request.body.code)
      .then(async (d) => {
        if (d) {
          const result = await User.findOne({
            username: ctx.request.body.username,
          });
          const token = signToken({
            id: result!.id,
            sub: result!.id.toString(),
            username: result!.username,
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
      });
  }
}
