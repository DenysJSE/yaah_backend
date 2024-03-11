import {BadRequestException, Injectable} from '@nestjs/common';
import {SubjectEntity} from "./entities/subject.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SubjectDto} from "./dto/subject.dto";
import {LessonEntity} from "../lessons/entities/lesson.entity";
import {ExamEntity} from "../exams/entities/exam.entity";
import {UserLessonEntity} from "../users/entities/user-lesson.entity";
import {UserExamEntity} from "../users/entities/user-exam.entity";
import {QuestionEntity} from "../exams/entities/question.entity";
import {OptionEntity} from "../exams/entities/option.entity";

@Injectable()
export class SubjectsService {

  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
    @InjectRepository(UserLessonEntity)
    private readonly userLessonRepository: Repository<UserLessonEntity>,
    @InjectRepository(UserExamEntity)
    private readonly userExamRepository: Repository<UserExamEntity>
  ) {}

  /**
   * @param subjectDto - title, description, lessonNumber, examNumber, courseDuration
   */
  async createSubject(subjectDto: SubjectDto) {
    const existSubject = await this.subjectRepository.findOne({
      where: {title: subjectDto.title}
    })

    if (existSubject) {
      throw new BadRequestException('The subject with such title already exist!')
    }

    const subject = this.subjectRepository.create(subjectDto)
    return await this.subjectRepository.save(subject)
  }

  async getAllSubjects() {
    return await this.subjectRepository.find({
      relations: ['exams', 'lessons'],
      order: {
        id: "ASC"
      }
    })
  }

  async getSubjectById(id: number) {
    const subject =  await this.subjectRepository.findOne({
      where: {id},
      relations: ['exams', 'lessons', 'lessons.subject']
    })

    if (!subject) {
      throw new BadRequestException('The subject with such id does not exist!')
    }

    return subject
  }

  /**
   * @param id - subjectID
   * @param subjectDto - title, description, lessonNumber, examNumber, courseDuration
   */
  async updateSubject(id: number, subjectDto: SubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: {id}
    })

    if (!subject) {
      throw new BadRequestException('The subject is not found!')
    }

    subject.title = subjectDto.title;
    subject.description = subjectDto.description;

    await this.subjectRepository.save(subject);

    return subject
  }

  async deleteSubject(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['exams', 'exams.questions', 'exams.questions.option', 'exams.userExams', 'lessons', 'lessons.userLessons', 'lessons.subject']
    });

    if (!subject) {
      throw new BadRequestException('The subject is not found!');
    }

    for (const exam of subject.exams) {
      for (const question of exam.questions) {
        await this.optionRepository.remove(question.option);
      }
    }

    for (const exam of subject.exams) {
      await this.questionRepository.remove(exam.questions);
    }

    for (const lesson of subject.lessons) {
      await this.userLessonRepository.remove(lesson.userLessons);
    }

    for (const exam of subject.exams) {
      await this.userExamRepository.remove(exam.userExams);
    }

    await this.lessonRepository.remove(subject.lessons);

    await this.examRepository.remove(subject.exams);

    await this.subjectRepository.remove(subject);

    return `The subject with ID: ${id} was deleted`;
  }
}
