// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArenaMessages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  channel: string;

  @Column()
  message: string;

  @Column()
  timestamp: string;

  @Column()
  isDeleted: boolean;

  @Column()
  isEdited: boolean;

  @Column()
  isPinned: boolean;

  @Column({
   // array: true,
   
  })
  flags: string;

  @Column({
    array: true,
   
  })
  media: string;
}
