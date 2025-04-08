import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  sigIn(@Body() createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    return this.authService.generateToken(email, password);
  }

}
