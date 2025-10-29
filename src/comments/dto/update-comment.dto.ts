import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({
        example: 'Обновлённый комментарий',
        description: 'Текст комментария',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'Комментарий не может превышать 500 символов' })
    content?: string;
}
