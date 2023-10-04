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
import {ExamModule} from './exams/exam.module';
import {MissionsModule} from './missions/missions.module';
import {MissionEntity} from "./missions/entities/mission.entity";
import * as process from "process";
import {ExamEntity} from "./exams/entities/exam.entity";
import {QuestionEntity} from "./exams/entities/question.entity";
import {OptionEntity} from "./exams/entities/option.entity";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
        ExamEntity,
        QuestionEntity,
        OptionEntity
      ],
      synchronize: true,
    }),
    UsersModule,
    SubjectsModule,
    LessonsModule,
    ExamModule,
    MissionsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
