import { Type } from 'class-transformer';
import { IsObject, IsString, IsUrl, ValidateNested } from 'class-validator';

class Headshot {
  @IsUrl()
  url: string;
}

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Headshot)
  headshot: Headshot;
}
