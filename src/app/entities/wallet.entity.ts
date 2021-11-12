import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
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
