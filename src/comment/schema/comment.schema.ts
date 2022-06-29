import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import mongoose from 'mongoose';
export type CommentDocument = Comment & Document;
@Schema({ timestamps: true })
export class Comment {
  @Prop([String])
  mentions: string[];
  @Prop([String])
  tags: string[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
