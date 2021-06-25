import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Blogs } from 'src/entities/blogs.entity';
import { BlogsRepository } from './blog.repository';

@Injectable()
export class BlogsService {
  constructor(private _blogsRepository: BlogsRepository) {}

  getAll() {
    return from(
      this._blogsRepository.find({
        relations: ['user', 'comment', 'comment.user'],
      }),
    );
  }

  get(code: string): Observable<any> {
    return from(
      this._blogsRepository.find({
        where: { code: code },
        relations: ['user', 'comment', 'comment.user'],
      }),
    ).pipe(
      mergeMap((response: any) => {
        return of(response);
      }),
    );
  }

  create(params: Blogs): Observable<any> {
    return from(this._blogsRepository.save(params)).pipe(
      mergeMap((response) => {
        if (!response) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Error occurred when blog creation',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        return of({
          success: true,
          message: `blog successfully created!`,
        });
      }),
    );
  }

  update(code: string, body: any) {
    let selectedBlog: any;
    return from(
      this._blogsRepository.find({
        code: code,
      }),
    ).pipe(
      mergeMap((response) => {
        selectedBlog = response;
        if (selectedBlog?.length === 0) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'blog does not exist',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        return from(
          this._blogsRepository.update(selectedBlog[0].id, body),
        ).pipe(
          mergeMap((response) => {
            if (!response || !response?.raw) {
              throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Error occurred when update blog',
                },
                HttpStatus.BAD_REQUEST,
              );
            }

            if (
              response?.raw?.affectedRows === 0 ||
              response?.raw?.changedRows === 0
            ) {
              return of({
                success: false,
                message: 'error occurred when updated the data',
              });
            }

            return of({
              success: true,
              message: `blog successfully updated!`,
            });
          }),
        );
      }),
    );
  }

  delete(id: string) {
    return from(this._blogsRepository.delete(id)).pipe(
      mergeMap((response) => {
        if (!response) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Error occurred when blog deletion',
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        return of({
          success: true,
          message: `blog successfully deleted!`,
        });
      }),
    );
  }
}
