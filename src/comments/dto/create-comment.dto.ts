import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class CreateCommentDto {
    @IsInt({ message: 'cardId должен быть числом' })
    @IsNotEmpty({ message: 'cardId обязателен' })
    cardId: number;

    @IsString({ message: 'Комментарий должен быть строкой' })
    @IsNotEmpty({ message: 'Комментарий не может быть пустым' })
    @MaxLength(300, { message: 'Комментарий не должен быть длиннее 300 символов' })
    content: string;
}
