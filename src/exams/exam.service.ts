import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateExamDto} from './dto/create-exam.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ExamEntity} from "./entities/exam.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";
import {SubjectEntity} from "../subjects/entities/subject.entity";

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
  ) {
  }

  async createExam(CreateExamDto: CreateExamDto): Promise<ExamEntity> {
    const subject = await this.subjectRepository.findOne({
      where: {id: CreateExamDto.subjectId},
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const existExam = await this.examRepository.findOne({
      where: {title: CreateExamDto.title, subject: subject},
    });

    if (existExam) {
      throw new ConflictException('An exam with such title already exists for this subject!');
    }

    const exam = this.examRepository.create({
      ...CreateExamDto,
      subject,
    });

    return await this.examRepository.save(exam);
  }

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const exam = await this.examRepository.findOne({
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
        throw new ConflictException('A correct option already exists for this question');
      }
    }

    const option = this.optionRepository.create({
      ...createOptionDto,
      question,
    });
    return await this.optionRepository.save(option);
  }

  async getAllExams() {
    return await this.examRepository.find({relations: ['questions', 'questions.option']})
  }

  async getExamByID(examID: number): Promise<ExamEntity> {
    const exam = await this.examRepository.findOne({
      where: {ID: examID},
      relations: ['questions', 'questions.option']
    });
    if (!exam) {
      throw new NotFoundException('Test not found');
    }
    return exam;
  }

  async updateExam(id: number, examDto: CreateExamDto) {
    const exam = await this.examRepository.findOne({
      where: {ID: id}
    })

    if (!exam) {
      throw new NotFoundException('The exam is not found!')
    }

    exam.title = examDto.title
    exam.description = examDto.description

    await this.examRepository.save(exam)

    return exam

  }

  async updateQuestion(id: number, questionDto: CreateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: {ID: id}
    })

    if (!question) {
      throw new NotFoundException('The question is not found!')
    }

    question.question = questionDto.question

    await this.questionRepository.save(question)

    return question

  }

  async updateOption(id: number, optionDto: CreateOptionDto) {
    const option = await this.optionRepository.findOne({
      where: {ID: id}
    })

    if (!option) {
      throw new NotFoundException('The option is not found!')
    }

    option.text = optionDto.text
    option.isCorrect = optionDto.isCorrect

    await this.optionRepository.save(option)

    return option

  }

  async deleteExam(id: number) {
    const exam = await this.examRepository.findOne({
      where: { ID: id },
      relations: ['questions', 'questions.option'],
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    const questions = exam.questions;

    await this.optionRepository.remove(exam.questions.flatMap((q) => q.option));
    await this.questionRepository.remove(questions);
    await this.examRepository.remove(exam);

    return 'The exam was deleted!';
  }

}
