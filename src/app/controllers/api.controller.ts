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
import { AppcenterController } from "./appcenter";
import { AuthController } from "./auth";
import { StorageController } from "./storage";
import { UsersController } from "./user";
import { WalletController } from "./wallet";

/**
 * Swagger documentation for the API.
 */
@ApiInfo({
  title: "Soloo API",
  version: "0.0.1",
})
@ApiServer({
  url: `/${Config.get("version", "string", "/v1")}`,
})
/**
 * The API controller.
 */
export class ApiController {
  subControllers = [
    controller("/users", UsersController),
    controller("/wallet", WalletController),
    controller("/auth", AuthController),
    controller("/appcenter", AppcenterController),
    controller("/storage", StorageController),
  ];

  @Get("/")
  index(ctx: Context) {
    return new HttpResponseForbidden("NO!");
  }
}
