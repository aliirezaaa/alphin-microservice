import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new ForbiddenException('This email has already use');
    }

    const createdUser = await this.userModel.create(createUserDto);
    return createdUser.toObject({ versionKey: false });
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return (await this.userModel.findOne({ _id: id })).toObject({
      versionKey: false,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const update = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return update.toObject({ versionKey: false });
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id });
  }
}
