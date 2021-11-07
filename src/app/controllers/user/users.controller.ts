import { Context, Get, HttpResponseOK, UserRequired } from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../../entities";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class UsersController {
  @Get("/")
  profile(ctx: Context) {
    console.log(ctx.user);
    return new HttpResponseOK();
  }
}
