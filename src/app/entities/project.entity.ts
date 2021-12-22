// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Issue, User } from ".";
import { ProjectCategory } from "../helpers/constants/projects";
import is from "../helpers/utils/validation";

@Entity()
export class Project extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    url: is.url(),
    category: [is.required(), is.oneOf(Object.values(ProjectCategory))],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  url: string | null;

  @Column("text", { nullable: true })
  description: string | null;

  @Column("varchar")
  category: ProjectCategory;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];

  @OneToMany(() => User, (user) => user.project)
  users: User[];
}
