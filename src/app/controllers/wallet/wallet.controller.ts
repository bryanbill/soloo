import {
  ApiUseTag,
  Context,
  Get,
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
import { WalletService } from "../../services";

@ApiUseTag("Wallet")
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
    const wUtil = new WalletService(ctx.request.body.amount);
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
      amount: { type: "number" },
    },
  })
  async withdraw(ctx: Context) {
    const wallet = await Wallet.findOne({ username: ctx.user.username });
    if (!wallet) {
      return new HttpResponseNotFound();
    }

    const result = await Wallet.update(
      { username: ctx.user.username },
      {
        amount: wallet.amount - ctx.request.body.amount,
        coins:
          wallet.coins -
          new WalletService(ctx.request.body.amount).calculateCoin(),
        updatedAt: new Date(Date.now()),
      }
    );

    //send amount to user's card or some other method

    if (result.affected! > 0) {
      return new HttpResponseOK(result);
    }
    return new HttpResponseBadRequest();
  }

  @Post("/transfer")
  @ValidateBody({
    type: "object",
    properties: {
      to: { type: "string" },
      coins: { type: "number" },
    },
  })
  async transfer(ctx: Context) {
    const { to, coins } = ctx.request.body;
    const wallet = await Wallet.findOne({ username: to });
    const myWallet = await Wallet.findOne({ username: ctx.user.username });
    if (!wallet || !myWallet) {
      return new HttpResponseNotFound({
        reason: `Either you or ${to} doesn't have an active wallet`,
      });
    }
    if (wallet.address === myWallet.address) {
      return new HttpResponseBadRequest({
        reason: `You can't transfer to yourself`,
      });
    }
    //Initiate the transaction
    const wUtil = new WalletService();
    const result = await wUtil.initiateTransaction({
      origin: myWallet.address,
      address: wallet.address,
      coins: Number(coins),
    });

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
        amount: wallet.amount + ctx.request.body.amount,
        coins:
          Number(wallet.coins) +
          new WalletService(ctx.request.body.amount).calculateCoin(),
      }
    );
    return new HttpResponseOK(result);
  }
}
