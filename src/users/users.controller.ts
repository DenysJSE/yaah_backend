import {Controller, Get, Post, Body, UseGuards, Delete, Param, Put} from '@nestjs/common';
import {UsersService} from './users.service';
import {RegistrationUserDto} from './dto/registration-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {RoleEntity} from "../roles/entities/role.entity";
import {AddRoleDto} from "./dto/add-role.dto";
import {UpdateUserNicknameDto} from "./dto/update-user-nickname.dto";
import {UpdateUserPasswordDto} from "./dto/update-user-password.dto";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({summary: "Create Users"})
  @ApiResponse({status: 201, type: [UserEntity]})
  @ApiResponse({status: 400, description: '' +
      'User does not enter email or enter incorrect format of email. ' +
      'User does not enter password or length of password is not between 6 - 30 character. ' +
      'User does not enter nickname or length of nickname is not between 3 - 50 character'
  })
  @ApiResponse({status: 404, description: 'Role does not found'})
  @ApiResponse({status: 409, description: 'User already exist'})
  @Post()
  create(@Body() createUserDto: RegistrationUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Get All Users"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @ApiResponse({status: 403, description: 'User do not have access to this endpoints'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: "Add Role"})
  @ApiResponse({status: 201, type: [RoleEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter role value or length of role value is less than 3 character. ' +
      'User does not enter description or length of description is less than 3 character'
  })
  @ApiResponse({status: 404, description: 'User or role are not found'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({summary: "Update Nickname"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @ApiResponse({status: 400, description:
      'User does not enter userID value or value is not a number. ' +
      'User does not enter new nickname or length of nickname is less than 3 character'
  })
  @ApiResponse({status: 404, description: 'User is not found'})
  @Put('update_nickname')
  updateUserNickname(@Body() updateUserNicknameDto: UpdateUserNicknameDto) {
    return this.usersService.updateNickname(updateUserNicknameDto)
  }

  @ApiOperation({summary: "Update Password"})
  @ApiResponse({status: 200, description: 'The password was updated successfully'})
  @ApiResponse({status: 400, description:
      'User does not enter userID value or value is not a number. ' +
      'User does not enter password or password is not correct. '+
      'User does not enter new password or length of password is less than 3 character'
  })
  @ApiResponse({status: 401, description: 'User enter incorrect password'})
  @ApiResponse({status: 404, description: 'User is not found'})
  @Put('update_password')
  updateUserPassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updateUserPassword(updateUserPasswordDto)
  }

  @ApiOperation({summary: "Delete User"})
  @ApiResponse({status: 200, description: 'User was deleted successfully'})
  @ApiResponse({status: 404, description: 'User is not found'})
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id)
  }

}
