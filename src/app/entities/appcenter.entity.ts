// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appcenter extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

}
