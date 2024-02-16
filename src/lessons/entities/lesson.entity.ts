import {
  Column,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {SubjectEntity} from "../../subjects/entities/subject.entity";
import {UserLessonEntity} from "../../users/entities/user-lesson.entity";


@Entity('Lessons')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  award: number;

  @Column('text')
  lessonData: string;

  @ManyToOne(() => SubjectEntity, (subject) => subject.lessons)
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

  @OneToMany(() => UserLessonEntity, userLesson => userLesson.lesson, { cascade: true, onDelete: 'CASCADE' })
  userLessons: UserLessonEntity[];
}
