import {Controller, Post, Get, Patch, Delete, Body, Param, Request, UseGuards, ParseIntPipe} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новый комментарий' })
    @ApiResponse({ status: 201, description: 'Комментарий успешно создан' })
    @ApiBody({ type: CreateCommentDto })
    create(@Request() req, @Body() dto: CreateCommentDto) {
        return this.commentsService.create(req.user.userId, dto);
    }

    @Get('card/:cardId')
    @ApiOperation({ summary: 'Получить комментарии для карточки' })
    @ApiParam({ name: 'cardId', description: 'ID карточки' })
    @ApiResponse({ status: 200, description: 'Комментарии успешно получены' })
    findByCard(@Param('cardId', ParseIntPipe) cardId: number) {
        return this.commentsService.findByCard(cardId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить комментарий по ID' })
    @ApiParam({ name: 'id', description: 'ID комментария' })
    @ApiBody({ type: UpdateCommentDto })
    @ApiResponse({ status: 200, description: 'Комментарий обновлён' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body() dto: UpdateCommentDto,
    ) {
        return this.commentsService.update(id, req.user.userId, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить комментарий по ID' })
    @ApiParam({ name: 'id', description: 'ID комментария' })
    @ApiResponse({ status: 200, description: 'Комментарий удалён' })
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.commentsService.remove(id, req.user.userId);
    }
}
