import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameType: 'practice' | 'timed';

  @Column({ default: false })
  completed: boolean;

  @OneToMany(() => Question, (question) => question.round)
  questions: Question[];
}
