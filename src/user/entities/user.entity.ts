import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsBase64, IsEmail, IsString } from 'class-validator';
import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  firstName: string;

  @Column({ nullable: false })
  @IsString()
  lastName: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column('text', { nullable: true })
  @IsBase64()
  imageUrl: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(
    type => Post,
    post => post.user,
  )
  posts: Post[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @OneToMany(
    type => Like,
    like => like.user,
  )
  likes: Like[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
