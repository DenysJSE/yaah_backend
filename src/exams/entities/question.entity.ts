import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ExamEntity} from "./exam.entity";
import {OptionEntity} from "./option.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Questions')
export class QuestionEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    example: "What is Past Simple?",
    description: "The question of exam"
  })
  @Column()
  question: string

  @ApiProperty({
    type: () => ExamEntity,
    isArray: true,
    description: 'Exam related to this question list'
  })
  @ManyToOne(() => ExamEntity, (exam) => exam.questions)
  exam: ExamEntity

  @ApiProperty({
    type: () => OptionEntity,
    isArray: true,
    description: 'List of option related to this question'
  })
  @OneToMany(() => OptionEntity, (option) => option.question)
  option: OptionEntity[]

}