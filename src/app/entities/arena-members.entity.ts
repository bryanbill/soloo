// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArenaMembers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  channel: string;

  @Column()
  joinedAt: Date;
  
  @Column()
  leftAt: Date;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  roles: string[];

  @Column()
  status: string;

  @Column()
  isBanned: boolean;

  @Column()
  isMuted: boolean;

  @Column()
  warnings: number;
}
