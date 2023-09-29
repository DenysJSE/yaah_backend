import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ExamEntity} from "./exam.entity";
import {OptionEntity} from "./option.entity";


@Entity('Questions')
export class QuestionEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question: string

  @ManyToOne(() => ExamEntity, (exam) => exam.questions)
  exam: ExamEntity

  @OneToMany(() => OptionEntity, (option) => option.question)
  option: OptionEntity[]

}