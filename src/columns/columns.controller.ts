import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @Post()
    create(@Body() body, @Req() req) {
        const userId = req.user.userId;
        return this.columnsService.create(body, userId);
    }

    @Get()
    findAll(@Req() req) {
        const userId = req.user.userId;
        return this.columnsService.findAll(userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.columnsService.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.columnsService.remove(Number(id));
    }
}
