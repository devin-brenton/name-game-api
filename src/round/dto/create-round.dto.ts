import { IsEnum } from 'class-validator';

export class CreateRoundDto {
  @IsEnum({ Practice: 'practice', Timed: 'timed' })
  gameType: string;
}
