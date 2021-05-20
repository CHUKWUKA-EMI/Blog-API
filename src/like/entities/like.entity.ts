import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsBoolean } from 'class-validator';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsBoolean()
  value: boolean;

  @Column()
  likerId: number;

  @ManyToOne(
    type => User,
    user => user.likes,
  )
  user: User;

  @ManyToOne(
    type => Post,
    post => post.likes,
  )
  post: Post;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string;
}
