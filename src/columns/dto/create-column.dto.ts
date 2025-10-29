import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
    @ApiProperty({
        example: 'To Do',
        description: 'Название колонки',
        maxLength: 100,
    })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    @MaxLength(100, { message: 'Название не должно превышать 100 символов' })
    title: string;
}
