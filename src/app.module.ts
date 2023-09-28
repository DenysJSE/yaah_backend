import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./users/entities/user.entity";
import {SubjectsModule} from './subjects/subjects.module';
import {SubjectEntity} from "./subjects/entities/subject.entity";
import {LessonsModule} from './lessons/lessons.module';
import {LessonEntity} from "./lessons/entities/lesson.entity";
import {TestsModule} from './tests/tests.module';
import {MissionsModule} from './missions/missions.module';
import {MissionEntity} from "./missions/entities/mission.entity";
import * as process from "process";
import {TestEntity} from "./tests/entities/test.entity";
import {QuestionEntity} from "./tests/entities/question.entity";
import {OptionEntity} from "./tests/entities/option.entity";

@Module({
  imports: [
    TestsModule,
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: Number(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_DATABASE,
      entities: [
        UserEntity,
        SubjectEntity,
        LessonEntity,
        MissionEntity,
        TestEntity,
        QuestionEntity,
        OptionEntity
      ],
      synchronize: true,
    }),
    UsersModule,
    SubjectsModule,
    LessonsModule,
    TestsModule,
    MissionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
