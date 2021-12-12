import { Wallet, Transaction } from "../../entities";

export class WalletService {
  private amount: number;
  constructor(amount?: number) {
    this.amount = amount!;
  }

  public calculateCoin() {
    //let's work on my amount
    const fee = (2 / 100) * this.amount;
    this.amount = this.amount - fee;

    console.log(this.amount);
    // one coin = 5 usd
    return this.amount;
  }

  public async initiateTransaction(payload) {
    const { origin, address, coins } = payload;
    const result = new Transaction();

    result.coins = coins;
    result.origin = origin;
    result.address = address;
    result.status = "pending";
    result.createdAt = new Date(Date.now());
    result.updatedAt = new Date(Date.now());
    result.transactionFee = 0.02 * coins;
    const transactionStatus = result
      .save()
      .then(async (_res) => {
        return await this.transfer(origin, address, coins);
      })
      .catch((err) => {
        console.log(err);
      });
    return transactionStatus;
  }

  public async transfer(origin: string, address: string, coins: number) {
    const wallet = await Wallet.findOne({ address: origin });
    const wallet2 = await Wallet.findOne({ address: address });

    //logically i think know what i just wrote, doesnt look great but, whatver
    if (wallet!.coins < coins) {
      return false;
    }
    const res = Wallet.update(
      { address: address },
      { coins: wallet2!.coins + coins }
    ).then(async (d) => {
      const res = Wallet.update(
        { address: origin },
        { coins: wallet!.coins - coins }
      )
        .then((d) => {
          return true;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
      return res;
    });

    return await res;
  }
}
