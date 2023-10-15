import {
  Column,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {SubjectEntity} from "../../subjects/entities/subject.entity";
import {IsNotEmpty, IsNumber, Length} from "class-validator";


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
  @IsNotEmpty()
  @Length(3)
  @Column()
  title: string;

  @ApiProperty({
    example: "Past Simple is the basic form of the past tense in Modern English.",
    description: "The data which lesson will contain"
  })
  @IsNotEmpty()
  @Length(3)
  @Column('text')
  lessonData: string;

  @ApiProperty({
    example: "Done",
    description: "The status of lesson - Done or Not Done"
  })
  @Column({
    default: false
  })
  isDone: boolean;

  @ApiProperty({
    type: () => SubjectEntity,
    isArray: true,
    description: 'Subject related to this lessons list'
  })
  @IsNotEmpty()
  @IsNumber()
  @ManyToOne(() => SubjectEntity, (subject) => subject.lessons)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

}
