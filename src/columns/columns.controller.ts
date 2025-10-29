import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Columns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую колонку' })
    @ApiResponse({ status: 201, description: 'Колонка успешно создана' })
    @ApiBody({ type: CreateColumnDto })
    create(@Request() req, @Body() dto: CreateColumnDto) {
        return this.columnsService.create(req.user.userId, dto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все колонки пользователя' })
    @ApiResponse({ status: 200, description: 'Список всех колонок' })
    findAll(@Request() req) {
        return this.columnsService.findAll(req.user.userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить колонку по ID' })
    @ApiResponse({ status: 200, description: 'Колонка обновлена' })
    @ApiBody({ type: UpdateColumnDto })
    update(@Param('id', ParseIntPipe) id: number, @Request() req, @Body() dto: UpdateColumnDto) {
        return this.columnsService.update(id, req.user.userId, { title: dto.title });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить колонку по ID' })
    @ApiResponse({ status: 200, description: 'Колонка удалена' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.columnsService.remove(id, req.user.userId);
    }
}
