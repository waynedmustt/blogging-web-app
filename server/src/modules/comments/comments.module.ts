import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
