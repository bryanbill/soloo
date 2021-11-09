import {
  Context,
  Get,
  HttpResponse,
  HttpResponseBadRequest,
  HttpResponseNotFound,
  HttpResponseOK,
  Patch,
  Post,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { v4 } from "uuid";
import { User, Wallet } from "../../entities";
import { WalletUtil } from "./wallet";

@JWTRequired({ cookie: true, user: fetchUser(User) })
export class WalletController {
  @Get("/")
  async getWallet(ctx: Context) {
    const wallet = await Wallet.findOne({ username: ctx.user.username }).catch(
      (err) => {
        console.log(err);
        return false;
      }
    );
    if (wallet) {
      return new HttpResponseOK(wallet);
    }
    return new HttpResponseNotFound();
  }

  @Post("/")
  @ValidateBody({
    type: "object",
    properties: {
      amount: { type: "number" },
    },
  })
  async createWallet(ctx: Context) {
    const wUtil = new WalletUtil(ctx.request.body.amount);
    const wallet = await Wallet.create({
      username: ctx.user.username,
      amount: ctx.request.body.amount,
      updatedAt: new Date(Date.now()),
      createdAt: new Date(Date.now()),
      address: v4(),
      coins: wUtil.calculateCoin(),
    });
    const result = await wallet.save();
    if (result) {
      return new HttpResponseOK(result);
    }

    return new HttpResponseBadRequest();
  }

  @Post("/withdraw")
  @ValidateBody({
    type: "object",
    properties: {
      coins: { type: "number" },
    },
  })
  async withdraw(ctx: Context) {}

  @Post("/transfer")
  @ValidateBody({
    type: "onject",
    properties: {
      to: { type: "string" },
      coins: { type: "number" },
    },
  })
  async transfer(ctx: Context) {
    const { to } = ctx.request.body;
    const wallet = await Wallet.findOne({ username: to });
    const myWallet = await Wallet.findOne({ username: ctx.user.username });
    if (!wallet || !myWallet) {
      return new HttpResponseNotFound();
    }
    const wUtil = new WalletUtil();
    const result = await wUtil.transfer(
      myWallet.address,
      wallet.address,
      ctx.request.body.coins
    );

    return new HttpResponseOK({
      isSuccess: result,
    });
  }

  @Patch("/")
  @ValidateBody({
    type: "object",
    properties: {
      amount: { type: "number" },
    },
  })
  async updateWallet(ctx: Context) {
    const wallet = await Wallet.findOne({ username: ctx.user.username });
    if (!wallet) {
      return new HttpResponseNotFound();
    }

    const result = await Wallet.update(
      { username: ctx.user.username },
      {
        amount: ctx.request.body.amount + wallet.amount,
        coins:
          +wallet.coins +
          new WalletUtil(ctx.request.body.amount).calculateCoin(),
        updatedAt: new Date(Date.now()),
      }
    );

    if (result.affected! > 0) {
      return new HttpResponseOK(result);
    }
    return new HttpResponseBadRequest();
  }
}
