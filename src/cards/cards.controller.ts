import {Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import {CardsService} from './cards.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
    constructor(private readonly cardsService: CardsService) {
    }

    @Post()
    create(
        @Request() req,
        @Body('columnId', ParseIntPipe) columnId: number,
        @Body('title') title: string,
        @Body('description') description?: string,
    ) {
        return this.cardsService.create(req.user.userId, columnId, title, description);
    }

    @Get(':columnId')
    findAll(@Param('columnId', ParseIntPipe) columnId: number, @Request() req) {
        return this.cardsService.findAll(columnId, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body('title') title: string,
        @Body('description') description?: string,
    ) {
        return this.cardsService.update(id, req.user.userId, {title, description});
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.cardsService.remove(id, req.user.userId);
    }
}
