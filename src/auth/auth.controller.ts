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
  @ApiResponse({status: 400, description:
      'User does not enter email or enter incorrect format of email. ' +
      'User does not enter password or length of password is not between 6 - 30 character'
  })
  @ApiResponse({status: 401, description: 'User enter incorrect email or password'})
  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto)
  }

  @ApiOperation({summary: "User Registration"})
  @ApiResponse({status: 201, type: [UserEntity]})
  @ApiResponse({status: 400, description: '' +
      'User does not enter email or enter incorrect format of email. ' +
      'User does not enter password or length of password is not between 6 - 30 character. ' +
      'User does not enter nickname or length of nickname is not between 3 - 50 character'
  })
  @ApiResponse({status: 404, description: 'Role does not found'})
  @ApiResponse({status: 409, description: 'User already exist'})
  @Post('registration')
  registration(@Body() userDto: RegistrationUserDto) {
    return this.authService.registration(userDto)
  }

}
