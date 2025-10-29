import { IsString, IsOptional, MaxLength, IsInt } from 'class-validator';

export class UpdateCardDto {
    @IsString({ message: 'Заголовок должен быть строкой' })
    @IsOptional()
    @MaxLength(100, { message: 'Заголовок не должен быть длиннее 100 символов' })
    title?: string;

    @IsString({ message: 'Описание должно быть строкой' })
    @IsOptional()
    @MaxLength(500, { message: 'Описание не должно быть длиннее 500 символов' })
    description?: string;

    @IsInt({ message: 'columnId должен быть числом' })
    @IsOptional()
    columnId?: number;
}
