import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    //TODO: check user
    const createdComment = await this.commentModel.create(createCommentDto);
    return createdComment.populate('user');
  }

  async findAll() {
    return await this.commentModel.find().populate('user');
  }
  async getTopTenStatistics() {
    return await this.commentModel.aggregate([
      {
        $facet: {
          tags: [
            {
              $unwind: {
                path: '$tags',
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $group: {
                _id: '$tags',
                count: {
                  $sum: 1.0,
                },
              },
            },
            {
              $project: {
                tag: '$_id',
                count: 1.0,
                _id: 0.0,
              },
            },
            {
              $sort: {
                count: -1.0,
              },
            },
            {
              $limit: 10.0,
            },
          ],
          mentions: [
            {
              $unwind: {
                path: '$mentions',
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $group: {
                _id: '$mentions',
                count: {
                  $sum: 1.0,
                },
              },
            },
            {
              $project: {
                tag: '$_id',
                count: 1.0,
                _id: 0.0,
              },
            },
            {
              $sort: {
                count: -1.0,
              },
            },
            {
              $limit: 10.0,
            },
          ],
        },
      },
    ]);
  }
  async findAllUserComments(userId: string) {
    return await this.commentModel.find({ user: userId }).populate('user');
  }
  async findOne(id: string) {
    return await (
      await this.commentModel.findOne({ _id: id })
    ).toObject({ versionKey: false });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const update = await this.commentModel.findByIdAndUpdate(
      id,
      updateCommentDto,
      {
        new: true,
      },
    );
    return update.toObject({ versionKey: false });
  }

  remove(id: string) {
    return this.commentModel.findByIdAndRemove({ _id: id });
  }
}
