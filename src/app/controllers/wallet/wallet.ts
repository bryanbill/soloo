import { Wallet } from "../../entities";

export class WalletUtil {
  private amount: number;
  constructor(amount?: number) {
    this.amount = amount!;
  }

  public calculateCoin() {
    //let's work on my amount
    const fee = 0.02;
    this.amount = this.amount - this.amount * fee;

    // one coin = 5 usd
    return this.amount / 5;
  }

  public async transfer(origin: string, address: string, coins: number) {
    Wallet.findOne({ address: origin }).then((wallet) => {
      wallet = wallet!;
      if (wallet.coins < coins) return;

      // Increase the receivers coin value by the coins transfered
      Wallet.update({ address: address }, { coins: coins });
    });
  }
}
