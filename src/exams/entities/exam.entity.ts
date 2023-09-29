import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Exams')
export class ExamEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number

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
    example: false,
    description: "Does user finish the exam or not - true/false"
  })
  @Column({
    default: false
  })
  isDone: boolean

  @ApiProperty({
    type: () => QuestionEntity,
    isArray: true,
    description: 'List of questions related to this exam'
  })
  @OneToMany(() => QuestionEntity, (question) => question.exam)
  questions: QuestionEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
