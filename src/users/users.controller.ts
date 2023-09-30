import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Create Users"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({summary: "Get All Users"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: "Get Users By ID"})
  @ApiResponse({status: 200, type: [UserEntity]})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

}
