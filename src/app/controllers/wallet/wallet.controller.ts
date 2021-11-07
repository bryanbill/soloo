import { Context, Get, HttpResponseOK } from '@foal/core';

export class WalletController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
