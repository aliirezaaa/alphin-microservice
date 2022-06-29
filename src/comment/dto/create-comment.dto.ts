import { IsArray, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsArray()
  tags: string;
  @IsArray()
  mentions: string;
  @IsString()
  user: string;
}
