import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {ExamEntity} from "../../exams/entities/exam.entity";
import {LessonEntity} from "../../lessons/entities/lesson.entity";

@Entity('Subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: 0})
  lessonsNumber: number;

  @Column({default: 0})
  examsNumber: number;

  @OneToMany(() => ExamEntity, (exam) => exam.subject, {cascade: true, onDelete: 'CASCADE'})
  exams: ExamEntity[];

  @OneToMany(() => LessonEntity, (lesson) => lesson.subject, {cascade: true, onDelete: 'CASCADE'})
  lessons: LessonEntity[];

}
