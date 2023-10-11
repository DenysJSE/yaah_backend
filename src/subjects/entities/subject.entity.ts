import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ExamEntity} from "../../exams/entities/exam.entity";

@Entity('Subjects')
export class SubjectEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "English Language",
    description: "The name of the subject"
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "The most popular language in the world",
    description: "The description of the subject"
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "10",
    description: "The amount of the lessons"
  })
  @Column()
  lessonsNumber: number;

  @ApiProperty({
    example: "10",
    description: "The amount of the exams"
  })
  @Column()
  examsNumber: number;

  @ApiProperty({
    example: "15",
    description: "The time which student should spent to finish the subject course"
  })
  @Column()
  courseDuration: number;

  @ApiProperty({
    type: () => ExamEntity,
    isArray: true,
    description: 'List of exams related to this subject'
  })
  @OneToMany(() => ExamEntity, (exam) => exam.subject)
  exams: ExamEntity[];

}
