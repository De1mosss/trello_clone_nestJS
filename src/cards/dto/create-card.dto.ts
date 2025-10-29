import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class CreateCardDto {
    @ApiProperty({ example: 'Сделать задачу', description: 'Название карточки' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @ApiProperty({ example: 'Описание задачи', description: 'Подробное описание карточки', required: false })
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiProperty({ example: 1, description: 'ID колонки, к которой принадлежит карточка' })
    @IsInt()
    columnId: number;
}
