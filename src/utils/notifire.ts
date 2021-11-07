import { Config } from "@foal/core";
import { Notifire, ChannelTypeEnum } from "@notifire/core";
import { SendgridEmailProvider } from "@notifire/sendgrid";

const notifier = new Notifire();

const registerNotifier = async () => {
  await notifier.registerProvider(
    new SendgridEmailProvider({
      apiKey: Config.get("SENDGRID_API_KEY"),
      from: Config.get("SENDGRID_FROM_EMAIL"),
    })
  );
};
