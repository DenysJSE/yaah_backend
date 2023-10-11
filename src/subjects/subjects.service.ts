import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {SubjectEntity} from "./entities/subject.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SubjectDto} from "./dto/subject.dto";

@Injectable()
export class SubjectsService {

  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>
  ) {}

  async createSubject(subjectDto: SubjectDto) {
    const existSubject = await this.subjectRepository.findOne({
      where: {title: subjectDto.title}
    })

    if (existSubject) {
      throw new ConflictException('The subject with such title already exist!')
    }

    const subject = this.subjectRepository.create(subjectDto)
    return await this.subjectRepository.save(subject)
  }

  async getAllSubjects() {
    return await this.subjectRepository.find()
  }

  async getSubjectById(id: number) {
    return await this.subjectRepository.findOne({
      where: {id}
    })
  }

  async updateSubject(id: number, subjectDto: SubjectDto) {
    const subject = await this.subjectRepository.findOne({
      where: {id}
    })

    if (!subject) {
      throw new NotFoundException('The subject is not found!')
    }

    subject.title = subjectDto.title;
    subject.description = subjectDto.description;
    subject.lessonsNumber = subjectDto.lessonsNumber;
    subject.examsNumber = subjectDto.examsNumber;
    subject.courseDuration = subjectDto.courseDuration;

    await this.subjectRepository.save(subject);

    return subject
  }

  async deleteSubject(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: {id}
    })

    if (!subject) {
      throw new NotFoundException('The subject is not found!')
    }

    await this.subjectRepository.delete(id)
    return `The subject with ID: ${id} was deleted`
  }

}
