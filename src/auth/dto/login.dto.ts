import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email пользователя',
    })
    @IsEmail({}, { message: 'Некорректный формат email' })
    email: string;

    @ApiProperty({
        example: 'strongPassword123',
        description: 'Пароль пользователя',
    })
    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @MinLength(6, { message: 'Минимальная длина пароля — 6 символов' })
    password: string;
}
