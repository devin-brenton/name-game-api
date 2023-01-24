import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { RoundModule } from 'src/round/round.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), ProfileModule, RoundModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
