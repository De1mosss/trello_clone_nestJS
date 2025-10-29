import {Controller, Post, Get, Patch, Delete, Body, Param, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    create(@Request() req, @Body() dto: CreateCommentDto) {
        return this.commentsService.create(req.user.userId, dto);
    }

    @Get('card/:cardId')
    findAll(@Param('cardId', ParseIntPipe) cardId: number) {
        return this.commentsService.findAll(cardId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateCommentDto,
    ) {
        return this.commentsService.update(id, req.user.userId, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.commentsService.remove(id, req.user.userId);
    }
}