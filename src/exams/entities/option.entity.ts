import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";


@Entity('Options')
export class OptionEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  isCorrect: boolean

  @ManyToOne(() => QuestionEntity, (question) => question.option)
  question: QuestionEntity

}