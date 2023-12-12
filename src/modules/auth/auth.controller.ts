import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/CreateAuth.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ description: 'Регистариация нового пользователя' })
    async create(@Body() createAuthDto:CreateAuthDto){
      return await this.authService.register(createAuthDto)
    }
  
    @Post('login')
    @ApiOperation({ description: 'Вход в приложения с логином и паролем' })
    async  login(@Body() dto: LoginDto) {
      return await this.authService.login(dto)
    }
}
