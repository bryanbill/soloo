import {
  ApiUseTag,
  Context,
  Delete,
  Get,
  Hook,
  HttpResponseForbidden,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Options,
  Patch,
  UserRequired,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../../entities";
import { Admin } from "../../hooks";

@ApiUseTag("Users")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class UsersController {
  @Get("/")
  async profile(ctx: Context) {
    const user = await User.findOne(ctx.user.id);
    if (user) {
      return new HttpResponseOK(user);
    }
    return new HttpResponseNotFound({
      reason: "User with that id was not found on this server.",
    });
  }
  @Get("/all")
  async all(ctx: Context) {
    return new HttpResponseOK({ users: await User.find() });
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
  @Admin()
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
