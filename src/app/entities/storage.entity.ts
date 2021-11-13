// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage" })
export class Storage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isPublic: boolean;

  @Column()
  isDeleted: boolean;
}
