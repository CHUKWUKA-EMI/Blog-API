import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Like } from './entities/like.entity';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Post])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
