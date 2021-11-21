import Vonage from "@vonage/server-sdk";
import axios from "axios";
export class VerificationService {
  private vonage: Vonage;
  constructor() {
    this.vonage = new Vonage({
      apiKey: process.env.VONAGE_API_KEY!,
      apiSecret: process.env.VONAGE_API_SECRET!,
    });
  }

  async sendVerificationCode(phoneNumber: string): Promise<string> {
    const res = await this.vonage.verify.request(
      {
        number: phoneNumber,
        brand: "Soloo",
      },
      (err, result) => {}
    );
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
