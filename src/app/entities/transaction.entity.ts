import { BaseEntity, Column, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
export class Transaction extends BaseEntity {
  @PrimaryColumn({
    default: v4(),
  })
  id: string;

  @Column({
      
  })
  destinationAddress: string;
  @Column({})
  sourceAddress: string;
  @Column({})
  coins: number;
  @Column({})
  transactionFee: number;
  @Column({})
  status: string;
  @Column({})
  createdAt: Date;
  @Column({})
  updatedAt: Date;
}
// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
