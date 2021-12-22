// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Project, User, Comment } from ".";
import { IssueType, IssueStatus, IssuePriority } from "../helpers/constants/issues";
import is from "../helpers/utils/validation";
//import striptags from 'striptags';
@Entity()
export class Issue extends BaseEntity {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(IssueType))],
    status: [is.required(), is.oneOf(Object.values(IssueStatus))],
    priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
    listPosition: is.required(),
    reporterId: is.required(),
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @Column("varchar")
  type: IssueType;

  @Column("varchar")
  status: IssueStatus;

  @Column("varchar")
  priority: IssuePriority;

  @Column("double precision")
  listPosition: number;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("text", { nullable: true })
  descriptionText: string | null;

  @Column("integer", { nullable: true })
  estimate: number | null;

  @Column("integer", { nullable: true })
  timeSpent: number | null;

  @Column("integer", { nullable: true })
  timeRemaining: number | null;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column("integer")
  reporterId: number;

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;

  @Column("integer")
  projectId: number;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.issues)
  @JoinTable()
  users: User[];

  @RelationId((issue: Issue) => issue.users)
  userIds: number[];

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = 'Issue Test';//striptags(this.description);
    }
  };
}
