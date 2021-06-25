import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Comments } from 'src/entities/comments.entity';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private _commentsRepository: CommentsRepository) {}

  create(params: Comments): Observable<any> {
    return from(this._commentsRepository.save(params)).pipe(
      mergeMap((response) => {
        if (!response) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Error occurred when commenting the blog',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        return of({
          success: true,
          message: `successfully commenting the blog!`,
        });
      }),
    );
  }
}
