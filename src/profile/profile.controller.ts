import { Controller, Post, Body, ParseArrayPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Post()
  // createBulk(
  //   @Body(new ParseArrayPipe({ items: CreateProfileDto }))
  //   createProfileDtos: CreateProfileDto[],
  // ) {
  //   return this.profileService.createBulk(createProfileDtos);
  // }
}
