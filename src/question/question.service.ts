import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ProfileService } from 'src/profile/profile.service';
import { RoundService } from 'src/round/round.service';
import { Repository } from 'typeorm';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

const NUM_OPTIONS = 6;

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly roundService: RoundService,
    private readonly profileService: ProfileService,
  ) {}

  async create(roundId: number): Promise<CreateQuestionResponseDto> {
    const round = await this.roundService.findOne(roundId);

    if (round.completed) {
      throw new UnprocessableEntityException(
        'Cannot create question for completed round',
      );
    }

    const profileIds = await this.profileService.findAllIds();

    const options = [];
    while (options.length < NUM_OPTIONS) {
      const idx = Math.floor(Math.random() * profileIds.length);

      if (options.indexOf(profileIds[idx]) < 0) {
        options.push(profileIds[idx]);
      }
    }

    const answerIdx = Math.floor(Math.random() * NUM_OPTIONS);
    const answerId = options[answerIdx];

    const question = plainToClass(Question, { options, answerId, round });
    await this.questionRepository.save(question);

    const profiles = await this.profileService.findSome(options);
    const responseOptions = profiles.map((profile) => {
      return { id: profile.id, headshotUrl: profile.headshotUrl };
    });

    const profileToFind = profiles.find((profile) => profile.id === answerId);
    const nameToFind = `${profileToFind.firstName} ${profileToFind.lastName}`;

    return plainToClass(CreateQuestionResponseDto, {
      id: question.id,
      roundId,
      nameToFind,
      options: responseOptions,
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: { round: true },
    });
    question.selectedId = updateQuestionDto.selectedId;

    await this.questionRepository.save(question);

    const isCorrect = question.answerId === question.selectedId;

    if (!isCorrect) {
      this.roundService.markCompleted(question.round.id);
    }

    return {
      message: 'Successfully submitted answer',
      isCorrect,
    };
  }
}
