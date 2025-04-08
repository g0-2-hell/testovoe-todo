import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
      return this.userModel.create(createUserDto);

  }

  findUserByEmailEndPassword(email: string, password: string) {
    return this.userModel.findOne({ email, password });
  }

  findOne(_id: string) {
    return this.userModel.findOne({_id})
  }

  remove(_id: string) {
    return this.userModel.updateOne({ _id }, { isDeleted: true });
  }
}
