import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { Issue, Project, Comment } from ".";
import is from "../helpers/utils/validation";

@Entity({ name: "users" })
export class User extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
  };
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
  avatarUrl: string;

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
    type: "boolean",
  })
  isActive: boolean;

  @Column({
    type: "varchar",
    array: true,
    default: {},
  })
  clients: string[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Issue, (issue) => issue.users)
  issues: Issue[];

  @ManyToOne(() => Project, (project) => project.users)
  project: Project;

  @RelationId((user: User) => user.project)
  projectId: number;
}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export { DatabaseSession } from "@foal/typeorm";
