import {
  Column,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {SubjectEntity} from "../../subjects/entities/subject.entity";
import {UserLessonEntity} from "../../users/entities/user-lesson.entity";


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
    example: "200",
    description: "The award which user earn after finish the lesson"
  })
  @Column()
  award: number;

  @ApiProperty({
    example: "Past Simple is the basic form of the past tense in Modern English.",
    description: "The data which lesson will contain"
  })
  @Column('text')
  lessonData: string;

  @ApiProperty({
    type: () => SubjectEntity,
    isArray: true,
    description: 'Subject related to this lessons list'
  })
  @ManyToOne(() => SubjectEntity, (subject) => subject.lessons)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

  @OneToMany(() => UserLessonEntity, userLesson => userLesson.lesson)
  userLessons: UserLessonEntity[];

}
