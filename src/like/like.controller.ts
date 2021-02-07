import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(
    @Request() req,
    @Body(new ValidationPipe()) createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.create(
      req.user ? req.user.userId : null,
      createLikeDto,
    );
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateLikeDto: UpdateLikeDto,
  ) {
    return this.likeService.update(+id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
