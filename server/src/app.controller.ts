import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { UsersService } from './modules/users/users.service';

@Controller()
export class AppController {
  constructor(
    private _usersService: UsersService,
    private _authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this._authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this._usersService.get(req?.user?.userId, {
      relations: ['role'],
    });
  }
}
