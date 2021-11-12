import {
  ApiUseTag,
  Context,
  Get,
  HttpResponseForbidden,
  HttpResponseNotFound,
  HttpResponseOK,
  UserRequired,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../../entities";

@ApiUseTag("Users")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class UsersController {
  @Get("/")
  async profile(ctx: Context) {
    const user = await User.findOne(ctx.user.id);
    if (user) {
      return new HttpResponseOK(user);
    }
    return new HttpResponseNotFound();
  }
}
