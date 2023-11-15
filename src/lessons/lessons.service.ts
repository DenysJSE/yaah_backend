import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessonEntity} from "./entities/lesson.entity";
import {Repository} from "typeorm";
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {SubjectEntity} from "../subjects/entities/subject.entity";
import {UserEntity} from "../users/entities/user.entity";
import {UserLessonEntity} from "../users/entities/user-lesson.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserLessonEntity)
    private readonly userLessonRepository: Repository<UserLessonEntity>,
    private readonly usersService: UsersService
  ) {}

  /**
   * @param lessonDTO - title, lessonData, subjectID
   */
  async createLesson(lessonDTO: CreateLessonDto) {
    const subject = await this.subjectRepository.findOne({
      where: {id: lessonDTO.subjectId},
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    const existLesson = await this.lessonRepository.findOne({
      where: {title: lessonDTO.title}
    })

    if (existLesson) {
      throw new BadRequestException('The lesson with such title already exist!')
    }

    const lesson = this.lessonRepository.create({
      ...lessonDTO,
      subject
    });

    const savedLesson = await this.lessonRepository.save(lesson);

    const users = await this.userRepository.find();

    const userLessons = users.map(user => ({
      user,
      lesson: savedLesson,
      isDone: false,
    }));

    await this.userLessonRepository.insert(userLessons);

    return savedLesson;
  }

  async getAllLessonsWithUserStatus() {
    const lessons = await this.lessonRepository.find({
      relations: ['userLessons', 'userLessons.user']
    });

    return lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      lessonData: lesson.lessonData,
      userStatus: lesson.userLessons.map(userLesson => ({
        userId: userLesson.user,
        isDone: userLesson.isDone,
      })),
    }));
  }

  async getLessonListBySubject() {
    return await this.lessonRepository.find({
      relations: ["subject"]
    })
  }

  async getAllLessons(userId: number) {
    const user = await this.userRepository.findOne({
      where: {id: userId},
      relations: ['userLessons', 'userLessons.lesson'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user.userLessons
  }

  async getLessonById(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: {id}
    })

    if (!lesson) {
      throw new BadRequestException(`The lesson with ID: ${id} not found!`)
    }

    return lesson
  }

  /**
   * @param id - lessonID
   * @param lessonDTO - title, lessonData, subjectID
   */
  async updateLesson(id: number, lessonDTO: CreateLessonDto) {
    const lesson = await this.lessonRepository.findOne({
      where: {id}
    })

    if (!lesson) {
      throw new BadRequestException('The lesson is not found!')
    }

    lesson.title = lessonDTO.title
    lesson.lessonData = lessonDTO.lessonData
    lesson.award = lessonDTO.award

    await this.lessonRepository.save(lesson)

    return lesson
  }

  async deleteLesson(id: number) {
    const lesson = await this.lessonRepository.findOne({
      where: {id},
      relations: ['userLessons'],
    })

    if (!lesson) {
      throw new BadRequestException('The subject is not found!')
    }

    await this.userLessonRepository.remove(lesson.userLessons);

    await this.lessonRepository.delete(id)

    return `The subject with ID: ${id} was deleted`
  }

  async updateIsDone(userId: number, lessonId: number) {
    const user = await this.userRepository.findOne({
      where: {id: userId}
    });

    const lesson = await this.lessonRepository.findOne({
      where: {id: lessonId}
    });

    if (!user || !lesson) {
      throw new BadRequestException('User or Lesson not found');
    }

    const userLesson = await this.userLessonRepository.findOne({
      where: { user, lesson },
    });

    if (!userLesson) {
      throw new BadRequestException('UserLesson not found');
    }

    userLesson.isDone = true;

    await this.usersService.setAward(user.id, lesson.award)

    return this.userLessonRepository.save(userLesson);
  }

}
