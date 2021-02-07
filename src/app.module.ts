import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Comment } from './comment/entities/comment.entity';
import { Like } from './like/entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
const dotenv = require('dotenv');

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      migrationsRun: true,
      synchronize: true,
      logging: true,
      entities: [User, Post, Comment, Like],
      migrations: ['src/migration/**/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
        entitiesDir: 'src/entities',
      },
    }),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
