import {Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, ParseIntPipe} from '@nestjs/common';
import {ColumnsService} from './columns.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {
    }

    @Post()
    create(@Request() req, @Body('title') title: string) {
        return this.columnsService.create(req.user.userId, title);
    }

    @Get()
    findAll(@Request() req) {
        return this.columnsService.findAll(req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
        @Body('title') title: string,
    ) {
        return this.columnsService.update(id, req.user.userId, {title});
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.columnsService.remove(id, req.user.userId);
    }
}
