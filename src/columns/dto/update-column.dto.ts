import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateColumnDto {
    @ApiPropertyOptional({ example: 'In Progress', description: 'Новое название колонки' })
    @IsString({ message: 'Название должно быть строкой' })
    @IsOptional()
    @MaxLength(100, { message: 'Название должно быть не длиннее 100 символов' })
    title?: string;
}
