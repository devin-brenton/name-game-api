import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { RoundModule } from './round/round.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ProfileModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'name_game',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RoundModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
