import { Round } from 'src/round/entities/round.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerId: number;

  @Column({ nullable: true })
  selectedId: number;

  @Column({ type: 'simple-array' })
  options: number[];

  @ManyToOne(() => Round, (round) => round.questions)
  round: Round;
}
