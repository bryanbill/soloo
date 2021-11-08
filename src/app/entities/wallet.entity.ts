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
    default: v4(),
  })
  
  address: string;
}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
