import {Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую карточку' })
    @ApiResponse({ status: 201, description: 'Карточка успешно создана' })
    @ApiBody({ type: CreateCardDto })
    create(@Request() req, @Body() dto: CreateCardDto) {
        return this.cardsService.create(req.user.userId, dto);
    }

    @Get(':columnId')
    @ApiOperation({ summary: 'Получить все карточки в колонке' })
    @ApiParam({ name: 'columnId', description: 'ID колонки' })
    @ApiResponse({ status: 200, description: 'Список карточек в колонке' })
    findAllInColumn(@Param('columnId', ParseIntPipe) columnId: number) {
        return this.cardsService.findAllByColumn(columnId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить карточку по ID' })
    @ApiParam({ name: 'id', description: 'ID карточки' })
    @ApiBody({ type: UpdateCardDto })
    @ApiResponse({ status: 200, description: 'Карточка обновлена' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateCardDto,
    ) {
        return this.cardsService.update(id, req.user.userId, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить карточку по ID' })
    @ApiParam({ name: 'id', description: 'ID карточки' })
    @ApiResponse({ status: 200, description: 'Карточка удалена' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.cardsService.remove(id, req.user.userId);
    }
}