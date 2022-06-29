import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop()
  lastName: string;
  @Prop()
  firstName: string;
  @Prop()
  phoneNumber: number;
  @Prop({ unique: true })
  userName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
