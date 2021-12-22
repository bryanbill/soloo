import {
  ApiInfo,
  ApiServer,
  ApiUseTag,
  Config,
  Context,
  controller,
  Get,
  Hook,
  HttpResponseForbidden,
  HttpResponseNoContent,
  HttpResponseOK,
  Options,
} from "@foal/core";
import { JWTOptional } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../entities";
import { AppcenterController } from "./appcenter";
import { AuthController } from "./auth";
import { CommentsController } from "./comments";
import { IssuesController } from "./issues";
import { MailController } from "./mail";
import { ProjectsController } from "./projects";
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
@Hook((ctx) => (response) => {
  response.setHeader(
    "Access-Control-Allow-Origin",
    ctx.request.get("Origin") || "*"
  );
  response.setHeader("Access-Control-Allow-Credentials", "true");
})
export class ApiController {
  subControllers = [
    controller("/users", UsersController),
    controller("/wallet", WalletController),
    controller("/auth", AuthController),
    controller("/appcenter", AppcenterController),
    controller("/storage", StorageController),
    controller("/mail", MailController),
    controller("/project", ProjectsController),
    controller("/issues", IssuesController),
    controller("/comments", CommentsController),
 
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
