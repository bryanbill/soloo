// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User, Issue } from ".";
import is from "../helpers/utils/validation";

@Entity()
export class Comment extends BaseEntity {
  static validations = {
    body: [is.required(), is.maxLength(50000)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  body: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column("integer")
  userId: number;

  @ManyToOne(() => Issue, (issue) => issue.comments, { onDelete: "CASCADE" })
  issue: Issue;

  @Column("integer")
  issueId: number;
}
