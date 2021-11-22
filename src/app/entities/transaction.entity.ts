import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column()
  origin: string;
  
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