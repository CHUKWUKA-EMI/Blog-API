import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(userId: number, createLikeDto: CreateLikeDto): Promise<Like> {
    const like = new Like();
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.postRepository.findOne({
        where: { id: createLikeDto.postId },
      });
      like.value = createLikeDto.value;
      like.user = user;
      like.post = post;
      const newLike = await this.likeRepo.save(like);
      return { ...newLike, user: newLike.user, post: newLike.post };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Like[]> {
    return await this.likeRepo.find({ relations: ['user', 'post'] });
  }

  async findOne(id: number): Promise<Like> {
    try {
      return await this.likeRepo.findOne(id, { relations: ['user'] });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateLikeDto: UpdateLikeDto): Promise<Like> {
    try {
      const like = await this.likeRepo.findOneOrFail(id);
      like.value = updateLikeDto.value;
      return await this.likeRepo.save(like);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    await this.likeRepo.delete(id);
    return 'like deleted';
  }
}
