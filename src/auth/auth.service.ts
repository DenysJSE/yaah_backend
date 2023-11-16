import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {RegistrationUserDto} from "../users/dto/registration-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserEntity} from "../users/entities/user.entity";
import {LoginUserDto} from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto)
    delete user.password;
    const tokenData = await this.generateToken(user)
    const token = tokenData.token
    return {
      token,
      user
    }
  }

  async registration(userDto: RegistrationUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)

    if (candidate) {
      throw new BadRequestException('User with such email already exist')
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)

    const user = await this.userService.create({...userDto, password: hashPassword})

    delete user.password
    const tokenData = await this.generateToken(user)
    const token = tokenData.token
    return {
      token,
      user: user
    }
  }

  async generateToken(user: UserEntity) {
    const payload = {
      email: user.email,
      id: user.id,
      nickname: user.nickname,
      roles: user.roles
    }
    return {
      token: await this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: LoginUserDto) {
    if (!userDto.email || !userDto.password) {
      throw new BadRequestException('You missed to fill email or password!')
    }

    const user = await this.userService.getUserByEmail(userDto.email)

    if (!user) {
      throw new BadRequestException('The user not found')
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password)

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'The email or password are incorrect'})
  }

}
