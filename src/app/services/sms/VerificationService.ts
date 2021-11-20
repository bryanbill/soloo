import Vonage from "@vonage/server-sdk";
import axios from "axios";
export class VerificationService {
  private vonage: Vonage;
  constructor() {
    console.log(process.env.VONAGE_API_KEY!);
    this.vonage = new Vonage({
      apiKey: process.env.VONAGE_API_KEY!,
      apiSecret: process.env.VONAGE_API_SECRET!,
    });
  }

  async sendVerificationCode(phoneNumber: string): Promise<string> {
    const res = axios({
      method: "post",
      url: "https://rest.nexmo.com/sms/json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        from: "Soloo",
        text: "Soloo OTP",
        to: `${phoneNumber}`,
        api_key: process.env.VONAGE_API_KEY!,
        api_secret: process.env.VONAGE_API_SECRET!,
      },
    });
    console.log(res);
    return "1";
  }

  async verifyCode(requestID: string, code: string): Promise<boolean> {
    let verified = false;
    const res = await this.vonage.verify.check(
      {
        request_id: requestID,
        code,
      },
      (err, result) => {
        if (err) {
          console.error(err);
          verified = false;
        }
        verified = result.status === "approved";
      }
    );

    console.log(res);

    return verified;
  }
}
