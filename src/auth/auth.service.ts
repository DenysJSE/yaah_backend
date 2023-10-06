import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserEntity} from "../users/entities/user.entity";

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new HttpException("User already exist", HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)

    await this.validateNickname(userDto)

    const user = await this.userService.create({...userDto, password: hashPassword})

    return this.generateToken(user)
  }

  async generateToken(user: UserEntity) {
    const payload = {
      email: user.email,
      id: user.id,
      nickname: user.nickname,
      roles: user.roles
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateNickname(userDto: CreateUserDto) {
    if (!userDto.nickname) {
      throw new HttpException("Nickname is required during registration", HttpStatus.BAD_REQUEST)
    }

    if (userDto.nickname.length < 5) {
      throw new HttpException("Nickname must be more than 5 character", HttpStatus.BAD_REQUEST)
    }

    const nickname = await this.userService.getUserByNickname(userDto.nickname)
    if (nickname) {
      throw new BadRequestException('The nickname already exist')
    }

    return nickname
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'The email or password are incorrect'})
  }

}
