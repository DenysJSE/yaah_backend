import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    if (existUser) {
      throw new BadRequestException("The user already exist")
    }

    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    const users = await this.userRepository.find()

    if (users.length === 0) {
      throw new NotFoundException("The are not any users in DataBase")
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { ID: id }
    })

    if (!user) {
      throw new NotFoundException("The user not found!")
    }

    return user
  }

}
