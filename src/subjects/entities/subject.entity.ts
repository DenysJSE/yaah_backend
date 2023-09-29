import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

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
  testsNumber: number;

  @ApiProperty({
    example: "15",
    description: "The time which student should spent to finish the subject course"
  })
  @Column()
  courseDuration: number;

  @ApiProperty({
    example: "23.05.23",
    description: "Date when lesson was created"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "25.05.23",
    description: "Date when lesson was updated"
  })
  @UpdateDateColumn()
  updatedAt: Date;

}
