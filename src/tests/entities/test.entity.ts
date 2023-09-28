import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";


@Entity('Tests')
export class TestEntity {

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

  @OneToMany(() => QuestionEntity, (question) => question.test)
  questions: QuestionEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
