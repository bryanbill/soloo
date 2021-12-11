import {
  ApiInfo,
  ApiServer,
  ApiUseTag,
  Config,
  Context,
  controller,
  Get,
  HttpResponseForbidden,
  HttpResponseOK,
} from "@foal/core";
import { JWTOptional } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../entities";
import { AppcenterController } from "./appcenter";
import { AuthController } from "./auth";
import { MailController } from "./mail";
import { StorageController } from "./storage";
import { UsersController } from "./user";
import { WalletController } from "./wallet";

@ApiInfo({
  title: "Soloo API",
  version: "0.0.1",
})
@ApiServer({
  url: `/${Config.get("version", "string", "/v1")}`,
})
export class ApiController {
  subControllers = [
    controller("/users", UsersController),
    controller("/wallet", WalletController),
    controller("/auth", AuthController),
    controller("/appcenter", AppcenterController),
    controller("/storage", StorageController),
    controller("/mail", MailController),
  ];

  @ApiUseTag("Server")
  @JWTOptional({ cookie: true, user: fetchUser(User) })
  @Get("/")
  index(ctx: Context) {
    if (ctx.user.role.includes("admin")) {
      return new HttpResponseOK({
        server: {
          name: "Soloo API",
          version: "0.0.1",
        },
      });
    }

    return new HttpResponseForbidden("NO!");
  }
}
