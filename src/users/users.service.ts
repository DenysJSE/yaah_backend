import {BadRequestException, Injectable} from '@nestjs/common';
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
      throw new BadRequestException('The user already exist')
    }

    return await this.userRepository.save(createUserDto)
  }

  async getAllUsers() {
    return await this.userRepository.find()
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {email}
    })
  }

  async getUserByNickname(nickname: string) {
    return await this.userRepository.findOne({
      where: {nickname}
    })
  }

}
