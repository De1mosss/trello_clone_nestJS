import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCardDto {
    @ApiProperty({ example: 'Обновлённая карточка', description: 'Новое название карточки', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @ApiProperty({ example: 'Новое описание', description: 'Обновлённое описание карточки', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}
