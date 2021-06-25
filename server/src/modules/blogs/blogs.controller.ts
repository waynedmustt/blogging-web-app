import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { BlogCreationPipe } from '../../commons/pipes/blog-creation.pipe';
import { createBlogSchema } from '../../commons/validations/schemas/Blog';
import { updateBlogSchema } from '../../commons/validations/schemas/UpdateBlog';
import { updateViewBlogSchema } from '../../commons/validations/schemas/UpdateViewBlog';
import { ValidationPipe } from '../../commons/validations/validation';
import { Blogs } from '../../entities/blogs.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogsService } from './blogs.service';

@Controller('blogs')
@UseFilters(new HttpExceptionFilter())
export class BlogsController {
  constructor(private _blogsService: BlogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this._blogsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this._blogsService.get(code);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new BlogCreationPipe(), new ValidationPipe(createBlogSchema))
  create(@Body() body: Blogs) {
    return this._blogsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':code')
  @UsePipes(new ValidationPipe(updateBlogSchema))
  update(@Param('code') code: string, @Body() body: Blogs) {
    return this._blogsService.update(code, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/view/:code')
  @UsePipes(new ValidationPipe(updateViewBlogSchema))
  updateView(@Param('code') code: string, @Body() body: Blogs) {
    return this._blogsService.update(code, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._blogsService.delete(id);
  }
}
