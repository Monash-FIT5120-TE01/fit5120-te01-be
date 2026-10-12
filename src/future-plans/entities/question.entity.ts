import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Project } from './project.entity.js';
import { QASource } from './qa-source.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'question' })
export class Question {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 255,
  })
  id: string;

  @Column({
    name: 'topic',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  topic: string | null;

  @Column({
    name: 'question',
    type: 'text',
  })
  question: string;

  @Column({
    name: 'answer',
    type: 'text',
  })
  answer: string;

  @Column({
    name: 'limit',
    type: 'text',
    nullable: true,
  })
  limit: string | null;

  @Column({
    name: 'project_id',
    type: 'integer',
  })
  projectId: number;

  @Column({
    name: 'answer_heading',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  answerHeading: string | null;

  @Column({
    name: 'evidence_basis',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  evidenceBasis: string | null;

  @ManyToOne(() => Project, (project) => project.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Awaited<Project>;

  @OneToMany(() => QASource, (qaSource) => qaSource.question)
  sources: Awaited<QASource[]>;
}
