import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({ example: 1, description: 'ID карточки, к которой добавляется комментарий' })
    @IsInt()
    cardId: number;

    @ApiProperty({ example: 'Отличная работа!', description: 'Текст комментария' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500, { message: 'Комментарий не может превышать 500 символов' })
    content: string;
}
