import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class BlogCreationPipe implements PipeTransform {
  // eslint-disable-next-line
  async transform(value: any, metadata: ArgumentMetadata) {
    const prefix = 'BLOG';
    // https://gist.github.com/gordonbrander/2230317 ID - a unique ID/name generator for JavaScript
    const code = (
      prefix + Math.random().toString(36).substr(2, 9)
    ).toUpperCase();

    value['code'] = code;
    value['view'] = 0;
    return value;
  }
}
