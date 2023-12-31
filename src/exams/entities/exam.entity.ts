import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {ApiProperty} from "@nestjs/swagger";
import {SubjectEntity} from "../../subjects/entities/subject.entity";
import {UserExamEntity} from "../../users/entities/user-exam.entity";


@Entity('Exams')
export class ExamEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  ID: number

  @ApiProperty({
    example: "Past Simple",
    description: "The title of the exam"
  })
  @Column()
  title: string

  @ApiProperty({
    example: "Past Simple is a time in English language",
    description: "The description of the exam"
  })
  @Column()
  description: string

  @ApiProperty({
    example: "200",
    description: "The award which user earn after finish the exam"
  })
  @Column()
  award: number;

  @ApiProperty({
    type: () => QuestionEntity,
    isArray: true,
    description: 'List of questions related to this exam'
  })
  @OneToMany(() => QuestionEntity, (question) => question.exam, {cascade: true})
  questions: QuestionEntity[]

  @ApiProperty({
    type: () => SubjectEntity,
    isArray: true,
    description: 'Subject related to this exams list'
  })
  @ManyToOne(() => SubjectEntity, (subject) => subject.exams)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

  @OneToMany(() => UserExamEntity, userExam => userExam.exam)
  userExams: UserExamEntity[];

}
