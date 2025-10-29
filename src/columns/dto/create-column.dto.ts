import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
    @ApiProperty({ example: 'To Do', description: 'Название колонки' })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не может быть пустым' })
    @MaxLength(100, { message: 'Название должно быть не длиннее 100 символов' })
    title: string;
}
