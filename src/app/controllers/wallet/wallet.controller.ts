import {
  Context,
  Get,
  HttpResponseBadRequest,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
} from "@foal/core";
import { Wallet } from "../../entities";
import { WalletUtil } from "./wallet";

export class WalletController {
  @Get("/")
  async getWallet(ctx: Context) {
    const wallet = await Wallet.findOne({ username: ctx.user.username });
    if (wallet) {
      return new HttpResponseOK(wallet);
    }
    return new HttpResponseNotFound();
  }

  @Post("/")
  async createWallet(ctx: Context) {
    const wUtil = new WalletUtil(ctx.request.body.amount);
    const wallet = await Wallet.create({
      username: ctx.user.username,
      amount: ctx.request.body.amount,
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
      coins: wUtil.calculateCoin(),
    });
    const result = await wallet.save();
    if (result) {
      return new HttpResponseOK(result);
    }

    return new HttpResponseBadRequest();
  }
}
