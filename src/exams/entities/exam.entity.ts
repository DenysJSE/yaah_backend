import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";


@Entity('Exams')
export class ExamEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({
    default: false
  })
  isDone: boolean

  @OneToMany(() => QuestionEntity, (question) => question.exam)
  questions: QuestionEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
