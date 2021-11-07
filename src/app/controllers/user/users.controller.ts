import { Context, Get, HttpResponseOK } from '@foal/core';

export class UsersController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
