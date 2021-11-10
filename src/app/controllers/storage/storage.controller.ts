import { Context, Get, HttpResponseOK } from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { User } from "../../entities";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class StorageController {
  @Get("/")
  getFiles(ctx: Context) {
    
    return new HttpResponseOK();
  }
}
