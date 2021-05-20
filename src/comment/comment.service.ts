import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(
    userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = new Comment();

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.postRepository.findOne({
        where: { id: createCommentDto.postId },
      });
      comment.content = createCommentDto.content;
      comment.userName = `${user.firstName} ${user.lastName}`;
      comment.userAvatar = user.imageUrl;
      comment.commenterId = user.id;
      comment.user = user;
      comment.post = post;
      const newComment = await this.commentsRepo.save(comment);
      return { ...newComment, user: newComment.user, post: newComment.post };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepo.find({ relations: ['user', 'post'] });
  }

  async findOne(id: number): Promise<Comment> {
    try {
      return await this.commentsRepo.findOneOrFail(id, { relations: ['user'] });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.commentsRepo.findOneOrFail(id);
      comment.content = updateCommentDto.content;
      return await this.commentsRepo.save(comment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    await this.commentsRepo.delete(id);
    return 'Comment deleted';
  }
}
