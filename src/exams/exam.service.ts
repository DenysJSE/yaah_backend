import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly testRepository: Repository<ExamEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  async createExam(CreateExamDto: CreateExamDto): Promise<ExamEntity> {
    const existExam = await this.testRepository.findOne({
      where: {title: CreateExamDto.title}
    });

    if (existExam) {
      throw new BadRequestException("The exam with such title already exist!")
    }

    const exam = this.testRepository.create(CreateExamDto)
    return await this.testRepository.save(exam);
  }

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const exam = await this.testRepository.findOne({
      where: {ID: createQuestionDto.examID}
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      exam,
    });
    return await this.questionRepository.save(question);
  }

  async createOption(createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const question = await this.questionRepository.findOne({
      where: {ID: createOptionDto.questionID}
    });
    if (!question) {
      throw new NotFoundException('Question not found');
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
    return await this.testRepository.find({relations: ['questions', 'questions.option']})
  }

  async getExamByID(examID: number): Promise<ExamEntity> {
    const exam = await this.testRepository.findOne({
      where: { ID: examID },
      relations: ['questions', 'questions.option']
    });
    if (!exam) {
      throw new NotFoundException('Test not found');
    }
    return exam;
  }
}
