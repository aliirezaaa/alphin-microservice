import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern('createComment')
  create(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @MessagePattern('findAllComment')
  findAll() {
    return this.commentService.findAll();
  }

  @MessagePattern('findAllUserComments')
  findAllUserComments(@Payload() id: string) {
    return this.commentService.findAllUserComments(id);
  }

  @MessagePattern('topTenStatistics')
  getTopTenStatistics() {
    return this.commentService.getTopTenStatistics();
  }

  @MessagePattern('findOneComment')
  findOne(@Payload() id: string) {
    return this.commentService.findOne(id);
  }

  @MessagePattern('updateComment')
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern('removeComment')
  remove(@Payload() id: string) {
    return this.commentService.remove(id);
  }
}
