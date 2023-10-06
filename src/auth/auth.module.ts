import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import * as process from "process";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "SECRET",
      signOptions: {expiresIn: '30d'}
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {
}
