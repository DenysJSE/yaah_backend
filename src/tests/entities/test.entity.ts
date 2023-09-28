import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";


@Entity('Tests')
export class TestEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  mark: number

  @Column({
    default: false
  })
  isDone: boolean

  @Column()
  questions: QuestionEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
