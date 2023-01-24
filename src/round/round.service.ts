import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateRoundDto } from './dto/create-round.dto';
import { Round } from './entities/round.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
  ) {}

  create(createRoundDto: CreateRoundDto) {
    const round = plainToClass(Round, createRoundDto);
    return this.roundRepository.save(round);
  }

  findOne(id: number) {
    return this.roundRepository.findOneBy({ id });
  }

  markCompleted(id: number) {
    this.roundRepository.update(id, { completed: true });
  }

  async getResultsForRound(id: number) {
    const round = await this.roundRepository.findOne({
      where: { id },
      relations: { questions: true },
    });

    const results: any = {};
    results.totalQuestions = round.questions.length;
    results.correct = round.questions.filter(
      (q) => q.selectedId === q.answerId,
    ).length;
    results.correctPercent = +(
      (results.correct / results.totalQuestions) *
      100
    ).toFixed(2);
    results.wrongPercent = +(100 - results.correctPercent).toFixed(2);
    return results;
  }
}
