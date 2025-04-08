import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GenerateTokenDto } from './dto/generate-token-dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  async generateToken(email: string, passport: string) {
    const user = await this.userService.findUserByEmailEndPassword(
      email,
      passport,
    );
    if(!user){
      throw new UnauthorizedException()
    }
    const {_id, role} = user;
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.sign({ _id, email, role }, { secret });
  }

}
