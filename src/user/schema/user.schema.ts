import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  lastName: string;

  @Prop()
  firstName: string;

  @Prop()
  phoneNumber: number;

  @Prop({ unique: true, index: true })
  userName: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
