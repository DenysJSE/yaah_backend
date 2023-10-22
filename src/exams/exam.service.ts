import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateExamDto} from './dto/create-exam.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {SubjectEntity} from "../subjects/entities/subject.entity";
import {UserEntity} from "../users/entities/user.entity";
import {UserExamEntity} from "../users/entities/user-exam.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserExamEntity)
    private readonly userExamRepository: Repository<UserExamEntity>,
    private readonly usersService: UsersService
  ) {
  }

  /**
   * @param CreateExamDto - title, description
   */
  async createExam(CreateExamDto: CreateExamDto): Promise<ExamEntity> {
    const subject = await this.subjectRepository.findOne({
      where: {id: CreateExamDto.subjectId},
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    const existExam = await this.examRepository.findOne({
      where: {title: CreateExamDto.title},
    });

    if (existExam) {
      throw new BadRequestException('An exam with such title already exists for this subject!');
    }

    const exam = this.examRepository.create({
      ...CreateExamDto,
      subject,
    });
    const savedExam = await this.examRepository.save(exam)

    const users = await this.userRepository.find()

    const userExams = users.map(user => ({
      user,
      exam: savedExam,
      isDone: false
    }))

    await this.userExamRepository.insert(userExams);

    return savedExam;
  }

  /**
   * @param createQuestionDto - question, examID
   */
  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const exam = await this.examRepository.findOne({
      where: {ID: createQuestionDto.examID}
    });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      exam,
    });
    return await this.questionRepository.save(question);
  }

  /**
   * @param createOptionDto - option text, questionID, isCorrect
   */
  async createOption(createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const question = await this.questionRepository.findOne({
      where: {ID: createOptionDto.questionID}
    });
    if (!question) {
      throw new BadRequestException('Question not found');
    }

    if (createOptionDto.isCorrect) {
      const existingCorrectOption = await this.optionRepository.findOne({
        where: {
          question: question,
          isCorrect: true,
        },
      });

      if (existingCorrectOption) {
        throw new BadRequestException('A correct option already exists for this question');
      }
    }

    const option = this.optionRepository.create({
      ...createOptionDto,
      question,
    });
    return await this.optionRepository.save(option);
  }

  async getAllExams() {
    return await this.examRepository.find({relations: ['questions', 'questions.option', 'subject']})
  }

  async getExamByID(examID: number): Promise<ExamEntity> {
    const exam = await this.examRepository.findOne({
      where: {ID: examID},
      relations: ['questions', 'questions.option']
    });
    if (!exam) {
      throw new BadRequestException('Test not found');
    }
    return exam;
  }

  /**
   * @param id - examID
   * @param examDto - title, description
   */
  async updateExam(id: number, examDto: CreateExamDto) {
    const exam = await this.examRepository.findOne({
      where: {ID: id}
    })

    if (!exam) {
      throw new BadRequestException('The exam is not found!')
    }

    exam.title = examDto.title
    exam.description = examDto.description

    await this.examRepository.save(exam)

    return exam

  }

  /**
   * @param id - questionID
   * @param questionDto - question, examID
   */
  async updateQuestion(id: number, questionDto: CreateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: {ID: id}
    })

    if (!question) {
      throw new BadRequestException('The question is not found!')
    }

    question.question = questionDto.question

    await this.questionRepository.save(question)

    return question

  }

  /**
   * @param id - optionID
   * @param optionDto - option text, questionID, isCorrect
   */
  async updateOption(id: number, optionDto: CreateOptionDto) {
    const option = await this.optionRepository.findOne({
      where: {ID: id}
    })

    if (!option) {
      throw new BadRequestException('The option is not found!')
    }

    option.text = optionDto.text
    option.isCorrect = optionDto.isCorrect

    await this.optionRepository.save(option)

    return option

  }

  async deleteExam(id: number) {
    const exam = await this.examRepository.findOne({
      where: { ID: id },
      relations: ['questions', 'questions.option', 'userExams'],
    });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    const questions = exam.questions;

    await this.userExamRepository.remove(exam.userExams)

    await this.optionRepository.remove(exam.questions.flatMap((q) => q.option));
    await this.questionRepository.remove(questions);
    await this.examRepository.remove(exam);

    return `The exam with ID: ${id} was deleted!`;
  }

  async updateIsDone(userID: number, examID: number) {
    const user = await this.userRepository.findOne({
      where: {id: userID}
    })

    const exam = await this.examRepository.findOne({
      where: {ID: examID}
    })

    if (!exam && !user) {
      throw new BadRequestException('User or Exam not found');
    }

    const userExam = await this.userExamRepository.findOne({
      where: {user, exam}
    })

    if (!userExam) {
      throw new BadRequestException('UserExam was not found')
    }

    userExam.isDone = true

    await this.usersService.setAward(user.id, exam.award)

    return this.userExamRepository.save(userExam)
  }

}
