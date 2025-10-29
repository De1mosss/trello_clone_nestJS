import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
    @ApiResponse({ status: 400, description: 'Некорректные данные или пользователь уже существует' })
    @ApiBody({ type: RegisterDto })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiResponse({ status: 200, description: 'Успешная авторизация. Возвращает JWT токен' })
    @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
    @ApiBody({ type: LoginDto })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
