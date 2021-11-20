// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appcenter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  appId: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  users: string[];
}
