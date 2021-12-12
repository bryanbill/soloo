import {
  ApiUseTag,
  Context,
  Get,
  HttpResponseOK,
  Post,
  ValidateBody,
} from "@foal/core";
import { JWTRequired } from "@foal/jwt";
import { fetchUser } from "@foal/typeorm";
import { Equal } from "typeorm";
import { Mail, User } from "../../entities";

@ApiUseTag("Mail")
@JWTRequired({ cookie: true, user: fetchUser(User) })
export class MailController {
  @Get("/")
  async getAllMails(ctx: Context) {
    const mails = await Mail.find({
      where: [
        { from: Equal(ctx.user.username) },
        { to: Equal(ctx.user.username) },
      ],
    });
    return new HttpResponseOK(mails);
  }

  @Get("/received")
  async getReceived(ctx: Context) {
    const mails = await Mail.find({
      where: [{ to: Equal(ctx.user.username), status: "sent" }],
    });
    return new HttpResponseOK(mails);
  }
  @Get("/delivered")
  async getDelivered(ctx: Context) {
    const mails = await Mail.find({
      where: [{ from: Equal(ctx.user.username), status: "sent" }],
    });
    return new HttpResponseOK(mails);
  }

  @Get("/outbox")
  async getOutbox(ctx: Context) {
    const mails = await Mail.find({
      where: [{ from: Equal(ctx.user.username), status: "not sent" }],
    });
    return new HttpResponseOK(mails);
  }

  @Post("/")
  @ValidateBody({
    properties: {
      to: { type: "string" },
      subject: { type: "string" },
      content: { type: "string" },
    },
  })
  async sendMail(ctx: Context) {
    const user2 = await User.findOne({
      where: { username: ctx.request.body.to },
    });
    if (user2) {
      const mail = new Mail();
      mail.to = ctx.request.body.to;
      mail.from = ctx.user.username;
      mail.subject = ctx.request.body.subject;
      mail.text = ctx.request.body.content;
      //get attachments from storage
      mail.attachments = [];
      mail.html = ctx.request.body.content;
      mail.status = "sent";
      await mail.save();
      return new HttpResponseOK(mail);
    }
    const mail = new Mail();
    mail.to = ctx.request.body.to;
    mail.from = ctx.user.username;
    mail.subject = ctx.request.body.subject;
    mail.text = ctx.request.body.content;
    //get attachments from storage
    mail.attachments = [];
    mail.html = ctx.request.body.content;
    mail.status = "not sent: user doesn't exist";
    await mail.save();
    return new HttpResponseOK(mail);
  }
}
