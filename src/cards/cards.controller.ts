import {Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import {CardsService} from './cards.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateCardDto} from './dto/create-card.dto';
import {UpdateCardDto} from './dto/update-card.dto';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
    constructor(private readonly cardsService: CardsService) {
    }

    @Post()
    create(@Request() req, @Body() dto: CreateCardDto) {
        return this.cardsService.create(req.user.userId, dto);
    }

    @Get('column/:columnId')
    findAllInColumn(@Param('columnId', ParseIntPipe) columnId: number) {
        return this.cardsService.findAllInColumn(columnId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateCardDto,
    ) {
        return this.cardsService.update(id, req.user.userId, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.cardsService.remove(id, req.user.userId);
    }
}
