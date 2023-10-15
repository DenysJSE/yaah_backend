import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessonEntity} from "./entities/lesson.entity";
import {Repository} from "typeorm";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {SubjectEntity} from "../subjects/entities/subject.entity";

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>
  ) {}

  async createLesson(lessonDTO: CreateLessonDto) {
    const subject = await this.subjectRepository.findOne({
      where: {id: lessonDTO.subjectId},
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const existLesson = await this.lessonRepository.findOne({
      where: {title: lessonDTO.title}
    })

    if (existLesson) {
      throw new ConflictException('The lesson with such title already exist!')
    }

    const lesson = this.lessonRepository.create({
      ...lessonDTO,
      subject
    })

    await this.lessonRepository.save(lesson)

    return lesson
  }

  async getAllLessons() {
    return this.lessonRepository.find({relations: ['subject']})
  }

  async updateLesson(id: number, lessonDTO: CreateLessonDto) {
    const lesson = await this.lessonRepository.findOne({
      where: {id}
    })

    if (!lesson) {
      throw new NotFoundException('The lesson is not found!')
    }

    lesson.title = lessonDTO.title
    lesson.lessonData = lessonDTO.lessonData

    await this.lessonRepository.save(lesson)

    return lesson
  }

  async deleteLesson(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: {id}
    })

    if (!lesson) {
      throw new NotFoundException('The subject is not found!')
    }

    await this.lessonRepository.delete(id)

    return `The subject with ID: ${id} was deleted`
  }

  async updateIsDone(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: {id}
    })

    if (!lesson) {
      throw new NotFoundException('The exam is not found!')
    }

    if (lesson.isDone === true) {
      throw new ConflictException('The exam is already DONE!')
    }

    lesson.isDone = true

    await this.lessonRepository.save(lesson)

    return 'The status was updated'
  }

}
