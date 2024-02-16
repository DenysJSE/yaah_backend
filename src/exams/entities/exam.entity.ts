import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {SubjectEntity} from "../../subjects/entities/subject.entity";
import {UserExamEntity} from "../../users/entities/user-exam.entity";


@Entity('Exams')
export class ExamEntity {
  @PrimaryGeneratedColumn()
  ID: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  award: number;

  @OneToMany(() => QuestionEntity, (question) => question.exam, {cascade: true})
  questions: QuestionEntity[]

  @ManyToOne(() => SubjectEntity, (subject) => subject.exams)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

  @OneToMany(() => UserExamEntity, userExam => userExam.exam)
  userExams: UserExamEntity[];
}
