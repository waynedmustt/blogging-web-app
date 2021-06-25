import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metaData: ArgumentMetadata) {
    if (metaData.type !== 'body') {
      return value;
    }
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error);
    }

    return value;
  }
}
