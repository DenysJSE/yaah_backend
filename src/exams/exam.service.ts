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

  // Create exam using ExamDTO( title, description )
  async createExam(CreateExamDto: CreateExamDto): Promise<ExamEntity> {
    const subject = await this.subjectRepository.findOne({
      where: {id: CreateExamDto.subjectId},
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    const existExam = await this.examRepository.findOne({
      where: {title: CreateExamDto.title, subject: subject},
    });

    if (existExam) {
      throw new BadRequestException('An exam with such title already exists for this subject!');
    }

    const exam = this.examRepository.create({
      ...CreateExamDto,
      subject,
    });

    return await this.examRepository.save(exam);
  }

  // Create questions for exam using QuestionDTO ( question, examID )
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

  // Create options for questions using OptionsDTO ( text of option, questionID, isCorrect )
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

  // Get All Exams
  async getAllExams() {
    return await this.examRepository.find({relations: ['questions', 'questions.option', 'subject']})
  }

  // Get exam by ID
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

  // Update info of Exam ( title, description )
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

  // Update info of Question ( question, examID )
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

  // Update info of Option ( text of option, questionID, isCorrect )
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

  // Delete Exam by ID
  async deleteExam(id: number) {
    const exam = await this.examRepository.findOne({
      where: { ID: id },
      relations: ['questions', 'questions.option'],
    });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    const questions = exam.questions;

    await this.optionRepository.remove(exam.questions.flatMap((q) => q.option));
    await this.questionRepository.remove(questions);
    await this.examRepository.remove(exam);

    return 'The exam was deleted!';
  }

  // Update field isDone in Exam Entity
  async updateIsDone(id: number) {
    const exam = await this.examRepository.findOne({
      where: {ID: id}
    })

    if (!exam) {
      throw new BadRequestException('The exam is not found!')
    }

    if (exam.isDone === true) {
      throw new BadRequestException('The exam is already DONE!')
    }

    exam.isDone = true

    await this.examRepository.save(exam)

    return 'The status isDone was updated'
  }

}
