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
import { decimalTransformer } from "../../utils/decimalTransformer";
@Entity({ name: "wallet" })
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  amount: number;

  @Column({
    type: "decimal",
    precision: 20,
    scale: 4,
    transformer: decimalTransformer,
  })
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
  transactionHash: string[];
}
