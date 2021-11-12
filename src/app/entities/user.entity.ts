import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @Column({
    default: "images/default.png",
  })
  avatar: string;

  @Column({
    unique: true,
  })
  username: string;
  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({
    default: "normal",
  })
  accountType: string;

  @Column({
    default: "normal",
  })
  role: string;

  @Column({
    default: false,
  })
  isDeleted: boolean;
}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
