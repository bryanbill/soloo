import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { types } from "util";
import { Transaction } from ".";
@Entity({ name: "wallet" })
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ type: "float" })
  coins: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    unique: true,
  })
  address: string;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  @OneToMany(() => Transaction, (transaction) => transaction.address)
  transactionHash: string[];
}
