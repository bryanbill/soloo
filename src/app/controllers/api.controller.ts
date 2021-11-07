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
  UseSessions,
} from "@foal/core";
import { fetchUser } from "@foal/typeorm";
import { User } from "../entities";
import { AuthController } from "./auth";
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
  ];

  @Get("/")
  index(ctx: Context) {
    return new HttpResponseForbidden("NO!");
  }
}
