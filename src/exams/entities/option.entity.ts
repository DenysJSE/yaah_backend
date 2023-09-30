import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Options')
export class OptionEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  ID: number

  @ApiProperty({
    example: "It is a time in English language",
    description: "The description of exam option"
  })
  @Column()
  text: string

  @ApiProperty({
    example: true,
    description: "Is option correct or not - true/false"
  })
  @Column()
  isCorrect: boolean

  @ApiProperty({
    type: () => OptionEntity,
    isArray: true,
    description: 'Question related to this option list'
  })
  @ManyToOne(() => QuestionEntity, (question) => question.option)
  question: QuestionEntity

}