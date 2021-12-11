// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Mail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  subject?: string;

  @Column()
  text: string;

  @Column()
  html: string;

  @Column("varchar", { length: 255, default: {} })
  attachments: string[];

  @Column()
  status: string;
}
