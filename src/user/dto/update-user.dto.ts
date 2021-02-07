import { IsBase64 } from 'class-validator';

export class UpdateUserDto {
  @IsBase64()
  imageUrl: string;
}
