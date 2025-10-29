import {Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import {ColumnsService} from './columns.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateColumnDto} from './dto/create-column.dto';
import {UpdateColumnDto} from './dto/update-column.dto';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {OwnershipGuard} from "../auth/ownership.guard";

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
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateColumnDto,
    ) {
        return this.columnsService.update(id, req.user.userId, dto);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.columnsService.remove(id, req.user.userId);
    }
}
