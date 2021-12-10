import {
  ApiUseTag,
  Context,
  Delete,
  Get,
  HttpResponseForbidden,
  HttpResponseNotFound,
  HttpResponseOK,
  Patch,
  UserRequired,
  ValidateBody,
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
      console.log(user.userStorageLimit);
      return new HttpResponseOK(user);
    }
    return new HttpResponseNotFound({
      reason: "User with that id was not found on this server.",
    });
  }
  @Patch("/")
  async changeStatus(ctx: Context) {
    const user = await User.findOne(ctx.user.id);
    if (user) {
      const res = await User.update(ctx.user.id, { isActive: !user.isActive });
      return new HttpResponseOK({
        message: "User disabled successfully.",
        data: res,
      });
    }
    return new HttpResponseNotFound({
      reason: "User with that id was not found on this server.",
    });
  }

  @Delete("/")
  async deleteUser(ctx: Context) {
    const user = await User.findOne(ctx.user.id);
    if (user) {
      await user.remove();
      return new HttpResponseOK({
        message: "User deleted successfully.",
      });
    }
    return new HttpResponseNotFound({
      reason: "User with that id was not found on this server.",
    });
  }
}
