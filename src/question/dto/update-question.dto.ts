import { IsNumber } from 'class-validator';

export class UpdateQuestionDto {
  @IsNumber()
  selectedId: number;
}
