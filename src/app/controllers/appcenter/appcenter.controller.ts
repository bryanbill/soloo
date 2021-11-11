import { Context, Get, HttpResponseOK } from '@foal/core';

export class AppcenterController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
