import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsRepository } from './blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogsRepository])],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
