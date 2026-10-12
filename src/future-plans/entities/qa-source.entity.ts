import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Question } from './question.entity.js';

@Entity({ schema: 'digital_twin_v2', name: 'qa_sources' })
export class QASource {
  @PrimaryColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'question_id',
    type: 'varchar',
    length: 255,
  })
  questionId: string;

  @Column({
    name: 'src_title',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  srcTitle: string | null;

  @Column({
    name: 'src_url',
    type: 'text',
    nullable: true,
  })
  srcUrl: string | null;

  @Column({
    name: 'src_checkdate',
    type: 'date',
    nullable: true,
  })
  srcCheckdate: Date | null;

  @ManyToOne(() => Question, (question) => question.sources, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Awaited<Question>;
}
