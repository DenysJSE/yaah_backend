import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as argon from 'argon2';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
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

    const user = await this.userRepository.save({
      nickname: createUserDto.nickname,
      email: createUserDto.email,
      password: await argon.hash(createUserDto.password)
    })

    const token = this.jwtService.sign({email: createUserDto.email})

    delete user.password

    return { user, token }
  }

  async findAll() {
    const users = await this.userRepository.find()

    if (users.length === 0) {
      throw new NotFoundException("The are not any users in DataBase")
    }

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new NotFoundException("The user not found!")
    }

    return user
  }

}
