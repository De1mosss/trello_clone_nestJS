import {Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import {ColumnsService} from './columns.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateColumnDto} from './dto/create-column.dto';
import {UpdateColumnDto} from './dto/update-column.dto';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';

@ApiTags('Columns')
@ApiBearerAuth()
@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {
    }

    @Post()
    @ApiOperation({summary: 'Создать новую колонку'})
    async create(@Request() req, @Body() dto: CreateColumnDto) {
        const userId = req.user.userId;
        return this.columnsService.create(userId, dto);
    }


    @Get()
    @ApiOperation({summary: 'Получить все колонки текущего пользователя'})
    async findAll(@Request() req) {
        const userId = req.user.userId;
        return this.columnsService.findAll(userId);
    }


    @Patch(':id')
    @ApiOperation({summary: 'Обновить колонку по ID (только владелец)'})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateColumnDto,
    ) {
        const userId = req.user.userId;
        return this.columnsService.update(id, userId, dto);
    }


    @Delete(':id')
    @ApiOperation({summary: 'Удалить колонку по ID (только владелец)'})
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user.userId;
        return this.columnsService.remove(id, userId);
    }
}
