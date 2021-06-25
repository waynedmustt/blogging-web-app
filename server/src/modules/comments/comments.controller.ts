import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { createCommentSchema } from '../../commons/validations/schemas/Comment';
import { ValidationPipe } from '../../commons/validations/validation';
import { Comments } from '../../entities/comments.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';

@Controller('comments')
@UseFilters(new HttpExceptionFilter())
export class CommentsController {
  constructor(private _commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe(createCommentSchema))
  create(@Body() body: Comments) {
    return this._commentsService.create(body);
  }
}
