import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


@Entity('Lessons')
export class LessonEntity {

  @ApiProperty({
    example: "1",
    description: "Unique ID Value"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Past Simple",
    description: "The title of lesson"
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Past Simple is the basic form of the past tense in Modern English.",
    description: "The data which lesson will contain"
  })
  @Column('text')
  lessonData: string;

  @ApiProperty({
    example: "Done",
    description: "The status of lesson - Done or Not Done"
  })
  @Column()
  status: string;

}
