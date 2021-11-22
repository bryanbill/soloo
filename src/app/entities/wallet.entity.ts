import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wallet" })
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  amount: number;

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

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  transactionHash: string[];
}
