import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private _usersRepository: UsersRepository) {}

  async getUsers() {
    const users = await this._usersRepository.find({
      relations: ['role'],
    });
    return users;
  }

  get(id: string, query?): Observable<any> {
    return from(this._usersRepository.findOne(id, query)).pipe(
      mergeMap((response) => {
        const user = response;
        if (user) {
          delete user.password;
        }
        return of(user ?? {});
      }),
    );
  }

  register(params: Users): Observable<any> {
    let selectedUser: any;
    return from(
      this._usersRepository.find({
        username: params.username,
      }),
    ).pipe(
      mergeMap((response) => {
        selectedUser = response;
        if (selectedUser?.length > 0) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'username is already exist',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        return from(this._usersRepository.save(params)).pipe(
          mergeMap((response) => {
            if (!response) {
              throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Error occurred when registration',
                },
                HttpStatus.BAD_REQUEST,
              );
            }

            return of({
              success: true,
              message: 'Successfully registered!',
            });
          }),
        );
      }),
    );
  }
}
