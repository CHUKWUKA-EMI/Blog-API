import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
const slugify = require('slugify');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    const user = await this.userRepository.findOne({ where: { id: userId } });
    try {
      post.title = createPostDto.title;
      post.slug = slugify(createPostDto.title, { lower: true });
      post.content = createPostDto.content;
      post.image = createPostDto.image ? createPostDto.image : null;
      post.user = user;
      const newPost = await this.postRepository.save(post);
      return { ...newPost, user: newPost.user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['user', 'comments', 'likes'],
    });
  }

  async findOne(id: number): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail(id, {
        relations: ['user', 'comments', 'likes'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBySlug(slug: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { slug: slug },
        relations: ['user', 'comments', 'likes'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.postRepository.findOne(id);
      if (!post) {
        throw new HttpException(
          'Post with that id does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      post.title = updatePostDto.title;
      post.slug = slugify(updatePostDto.title, { lower: true });
      post.content = updatePostDto.content;
      post.image = updatePostDto.image;

      return await this.postRepository.save(post);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    await this.postRepository.delete(id);
    return `Post with id ${id} deleted`;
  }
}
