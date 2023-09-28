import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {QuestionEntity} from "./entities/question.entity";
import {OptionEntity} from "./entities/option.entity";
import {Repository} from "typeorm";
import {CreateQuestionDto} from "./dto/create-question.dto";
import {CreateOptionDto} from "./dto/create-option.dto";

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  async createTest(createTestDto: CreateTestDto): Promise<TestEntity> {
    const test = this.testRepository.create(createTestDto);
    return await this.testRepository.save(test);
  }

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    const test = await this.testRepository.findOne({
      where: {id: createQuestionDto.testID}
    });
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    const question = this.questionRepository.create({
      ...createQuestionDto,
      test,
    });
    return await this.questionRepository.save(question);
  }

  async createOption(createOptionDto: CreateOptionDto): Promise<OptionEntity> {
    const question = await this.questionRepository.findOne({
      where: {id: createOptionDto.questionID}
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

  async getTestWithQuestionsAndOptions(testId: number): Promise<TestEntity> {
    const test = await this.testRepository.findOne({
      where: { id: testId },
      relations: ['questions', 'questions.option']
  });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    return test;
  }
}
