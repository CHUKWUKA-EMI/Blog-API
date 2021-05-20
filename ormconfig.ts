import { User } from './src/user/entities/user.entity';
import { Post } from './src/post/entities/post.entity';
import { Comment } from './src/comment/entities/comment.entity';
import { Like } from './src/like/entities/like.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  migrationsRun: true,
  synchronize: true,
  entities: [User, Post, Comment, Like],
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ['dist/src/migration/**/*{.ts, .js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
