import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Request() req,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
  ) {
    return this.postService.create(req.user.userId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
