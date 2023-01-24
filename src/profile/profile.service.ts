import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  createBulk(createProfileDtos: CreateProfileDto[]) {
    const recordsToCreate: Profile[] = [];
    createProfileDtos.forEach((profileDto) => {
      const profile = new Profile();

      profile.firstName = profileDto.firstName;
      profile.lastName = profileDto.lastName;
      profile.headshotUrl = profileDto.headshot.url;

      if (!profile.headshotUrl) {
        console.log('no headshot url');
      } else {
        recordsToCreate.push(profile);
      }
    });

    return this.profileRepository.save(recordsToCreate);
  }

  async findAllIds(): Promise<number[]> {
    const profiles = await this.profileRepository.query(
      `SELECT id FROM PROFILE`,
    );
    return profiles.map((profile) => profile.id);
  }

  findSome(ids: number[]): Promise<Profile[]> {
    return this.profileRepository.query(
      `SELECT * FROM profile WHERE id IN (${ids.join(', ')})`,
    );
  }

  findOne(id: number): Promise<Profile> {
    return this.profileRepository.findOneBy({ id });
  }
}
