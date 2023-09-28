import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TestEntity} from "./test.entity";
import {OptionEntity} from "./option.entity";


@Entity('Questions')
export class QuestionEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question: string

  @ManyToOne(() => TestEntity, (test) => test.questions)
  test: TestEntity

  @OneToMany(() => OptionEntity, (option) => option.question)
  option: OptionEntity[]

}