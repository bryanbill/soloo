// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Arena extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    unique: true,
  })
  channel: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isPublic: boolean;

  @Column()
  isActive: boolean;

  @Column()
  members: number;

  @Column()
  reports: string[];

  ration() {
    return (this.reports.length / this.members) * 100;
  }
}
