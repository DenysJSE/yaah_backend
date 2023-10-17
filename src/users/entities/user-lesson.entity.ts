import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {LessonEntity} from "../../lessons/entities/lesson.entity";


@Entity('UserLesson')
export class UserLessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.userLessons)
  user: UserEntity;

  @ManyToOne(() => LessonEntity, lesson => lesson.userLessons)
  lesson: LessonEntity;

  @Column({ default: false })
  isDone: boolean;
}