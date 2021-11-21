import { Notifire, ChannelTypeEnum } from "@notifire/core";
import { SendgridEmailProvider } from "@notifire/sendgrid";

export class NotifireService {
  private notifire: Notifire;
  constructor() {
    this.notifire = new Notifire();
    this.registerSendgridProvider()
      .then(() => {
        this.registerSendgridTemplate();
      })
      .catch((err) => {
        console.error("Error registering Sendgrid provider", err);
      });
  }

  private async registerSendgridProvider() {
    await this.notifire.registerProvider(
      new SendgridEmailProvider({
        apiKey: process.env.SENDGRID_API_KEY!,
        from: "noreply@soloo.me",
      })
    );
  }

  private async registerSendgridTemplate() {
    const res = await this.notifire.registerTemplate({
      id: "verification",
      messages: [
        {
          subject: "Verify Login Request",
          channel: ChannelTypeEnum.EMAIL,
          template: `
              Verification Code: {{verificationCode}}
          `,
        },
      ],
    });
    return res;
  }

  public async triggerSendgridEmail(
    email: string,
    userId: string,
    verificationCode: string
  ) {
    await this.notifire.trigger("verification", {
      $user_id: userId,
      $email: email,
      verificationCode: verificationCode,
    });
  }
}
