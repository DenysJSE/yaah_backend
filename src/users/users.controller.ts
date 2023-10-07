import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {RoleEntity} from "../roles/entities/role.entity";
import {AddRoleDto} from "./dto/add-role.dto";


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
  create(@Body() createUserDto: CreateUserDto) {
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

}
