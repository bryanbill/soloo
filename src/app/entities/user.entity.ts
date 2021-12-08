import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: "normal",
  })
  accountType: string;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  role: string[];

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  clients: string[];

  get userStorageLimit(): number {
    //Storage limit in GB
    return this.accountType === "admin"
      ? 10
      : this.accountType === "premium"
      ? 5
      : 1;
  }
}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
