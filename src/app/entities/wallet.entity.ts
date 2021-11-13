import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

@Entity({ name: "wallet" })
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  amount: string;

  @Column()
  coins: number;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({
    unique: true,
  })
  address: string;
}
