import { Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { RolesRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(private _rolesRepository: RolesRepository) {}

  getAll(): Observable<any> {
    return from(this._rolesRepository.find()).pipe(
      mergeMap((response) => {
        return of(response);
      }),
    );
  }
}
