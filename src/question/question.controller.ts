import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('rounds/:roundId/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Param('roundId', ParseIntPipe) roundId: number) {
    return this.questionService.create(roundId);
  }

  @Patch(':id')
  update(
    @Param('roundId', ParseIntPipe) roundId: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(roundId, updateQuestionDto);
  }
}
