import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCommentDto {
    @IsString({ message: 'Комментарий должен быть строкой' })
    @IsOptional()
    @MaxLength(300, { message: 'Комментарий не должен быть длиннее 300 символов' })
    content?: string;
}
