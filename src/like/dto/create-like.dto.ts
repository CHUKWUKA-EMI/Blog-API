import { IsBoolean, IsNumber } from 'class-validator';
export class CreateLikeDto {
  @IsBoolean()
  value: boolean;

  @IsNumber()
  postId: number;
}
