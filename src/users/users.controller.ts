import {Controller, Get, Post, Body, UseGuards, Delete, Param, Put, Req} from '@nestjs/common';
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
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import { Request } from 'express';

interface IUser {
  id: number,
  email: string
  nickname: string,
  roles: {
    id: number,
    value: string,
    description: string
  }
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({summary: "Create Users"})
  @ApiResponse({status: 201, type: [UserEntity]})
  @Post()
  createUser(@Body() createUserDto: RegistrationUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Get All Users"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get_user')
  getUserByID(@Req() req: Request) {
    const user = req.user as IUser;
    return this.usersService.getUserByID(user.id)
  }

  @ApiOperation({summary: "Add Role"})
  @ApiResponse({status: 201, type: [RoleEntity]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({summary: "Update Nickname"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @Put('update_nickname')
  updateUserNickname(@Body() updateUserNicknameDto: UpdateUserNicknameDto) {
    return this.usersService.updateNickname(updateUserNicknameDto)
  }

  @ApiOperation({summary: "Update Password"})
  @ApiResponse({status: 200, description: 'The password was updated successfully'})
  @Put('update_password')
  updateUserPassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updateUserPassword(updateUserPasswordDto)
  }

  @ApiOperation({summary: "Delete User"})
  @ApiResponse({status: 200, description: 'User was deleted successfully'})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id)
  }

}
