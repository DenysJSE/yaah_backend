import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {ExamEntity} from "../../exams/entities/exam.entity";

@Entity('UserExam')
export class UserExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.userExams)
  user: UserEntity;

  @ManyToOne(() => ExamEntity, exam => exam.userExams)
  exam: ExamEntity;

  @Column({ default: false })
  isDone: boolean;
}