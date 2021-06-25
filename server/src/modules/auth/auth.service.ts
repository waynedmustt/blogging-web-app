import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Observable, of } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUsers(username, password) {
    const user: any = await this._usersService.getUsers();
    return this._getSelectedUser(user, username, password);
  }

  private async _getSelectedUser(user, username, userPassword) {
    const selectedUser = user.find((user) => user.username === username);
    if (!selectedUser) {
      return null;
    }
    const match = await bcrypt.compare(userPassword, selectedUser.password);
    delete selectedUser.password;
    return match ? selectedUser : null;
  }

  login(user: any): Observable<any> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role.type,
    };
    const selectedUser = user;
    delete selectedUser.password;
    return of({
      user: selectedUser,
      accessToken: this._jwtService.sign(payload),
    });
  }
}
