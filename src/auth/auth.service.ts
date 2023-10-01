import { Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as argon from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../types/types";

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordMatches = await argon.verify(user.password, password)

    if (user && passwordMatches) {
      return user;
    }

    throw new UnauthorizedException("Email or password are incorrect")
  }

  async login(user: IUser) {
    const {id, email} = user
    return {
      id,
      email,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email
      })
    }
  }

}
