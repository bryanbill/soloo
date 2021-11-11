import {
  BaseEntity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  destinationAddress: string;
  @Column()
  sourceAddress: string;
  @Column()
  coins: number;
  @Column()
  transactionFee: number;
  @Column()
  status: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}