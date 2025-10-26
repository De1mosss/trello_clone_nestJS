import {Controller, Post, Get, Patch, Delete, Body, Param, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {
    }

    @Post()
    create(
        @Request() req,
        @Body('cardId', ParseIntPipe) cardId: number,
        @Body('content') content: string,
    ) {
        return this.commentsService.create(req.user.userId, cardId, content);
    }

    @Get(':cardId')
    findAll(@Param('cardId', ParseIntPipe) cardId: number) {
        return this.commentsService.findAll(cardId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body('content') content: string,
    ) {
        return this.commentsService.update(id, req.user.userId, content);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.commentsService.remove(id, req.user.userId);
    }
}
