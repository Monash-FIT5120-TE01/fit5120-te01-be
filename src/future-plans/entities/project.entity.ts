import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Question } from './question.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'project' })
export class Project {
  @PrimaryColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    name: 'topic',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  topic: string | null;

  @OneToMany(() => Question, (question) => question.project)
  questions: Awaited<Question[]>;
}
