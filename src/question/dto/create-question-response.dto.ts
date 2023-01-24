import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Option {
  @IsNumber()
  id: number;

  @IsUrl()
  headshotUrl: string;
}

export class CreateQuestionResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  roundId: number;

  @IsString()
  nameToFind: string;

  @IsArray()
  @ValidateNested()
  @Type(() => Option)
  options: Option[];
}
