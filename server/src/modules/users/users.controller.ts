import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { HashPasswordPipe } from '../../commons/pipes/hash-password.pipe';
import { createUserSchema } from '../../commons/validations/schemas/User';
import { ValidationPipe } from '../../commons/validations/validation';
import { Users } from '../../entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post('register')
  @UsePipes(new HashPasswordPipe(), new ValidationPipe(createUserSchema))
  register(@Body() body: Users) {
    return this._usersService.register(body);
  }
}
