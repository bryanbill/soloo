import { Wallet, Transaction } from "../../entities";

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

  public async initiateTransaction(payload) {
    const { origin, address, coins } = payload;
    const result = new Transaction();

    result.coins = coins;
    result.sourceAddress = origin;
    result.destinationAddress = address;
    result.status = "pending";
    result.createdAt = new Date(Date.now());
    result.updatedAt = new Date(Date.now());
    result.transactionFee = 0.02 * coins;
    result
      .save()
      .then(async (res) => {
        await this.transfer(origin, address, coins);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return result;
      });
  }

  public async transfer(origin: string, address: string, coins: number) {
    const init = Wallet.findOne({ address: origin })
      .then(async (wallet) => {
        wallet = wallet!;
        if (wallet.coins < coins) return;
        // Get the initial coin value for the receiver
        const w = await Wallet.findOne({ address: address });
        // Increase the receivers coin value by the coins transfered
        await Wallet.update({ address: address }, { coins: w!.coins + coins });
        // Decrease the sender's coin value by the coins transfered
        await Wallet.update(
          { address: origin },
          { coins: wallet.coins - coins }
        );
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return await init;
  }
}
