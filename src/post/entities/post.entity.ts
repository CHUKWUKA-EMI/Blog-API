import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column('text')
  @IsString()
  content: string;

  @Column('text', { nullable: true })
  image: string;

  @ManyToOne(
    type => User,
    user => user.posts,
  )
  user: User;

  @OneToMany(
    type => Comment,
    comment => comment.post,
  )
  comments: Comment[];

  @OneToMany(
    type => Like,
    like => like.post,
  )
  likes: Like[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
