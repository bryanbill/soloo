import {
  ApiInfo,
  ApiServer,
  Config,
  Context,
  controller,
  Get,
  HttpResponseOK,
} from "@foal/core";
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
  ];

  @Get("/")
  index(ctx: Context) {
    return new HttpResponseOK("Hello world!");
  }
}
