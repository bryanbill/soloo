import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { User, Wallet } from ".";
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @RelationId((wallet: Wallet) => wallet.address)
  address: string;

  @Column()
  @RelationId((wallet: Wallet) => wallet.address)
  origin: string;

  @Column()
  coins: number;

  @Column()
  transactionFee: number;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
