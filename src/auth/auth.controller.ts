import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RegistrationUserDto} from "../users/dto/registration-user.dto";
import {UserEntity} from "../users/entities/user.entity";
import {LoginUserDto} from "../users/dto/login-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiOperation({summary: "User Login"})
  @ApiResponse({status: 201, type: [UserEntity]})
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: "User Registration"})
  @ApiResponse({status: 201, type: [UserEntity]})
  @Post('registration')
  registration(@Body() userDto: RegistrationUserDto) {
    return this.authService.registration(userDto)
  }

}
