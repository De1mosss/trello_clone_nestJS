import {Injectable, NotFoundException, ForbiddenException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {Prisma} from '@prisma/client';

@Injectable()
export class ColumnsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(userId: number, title: string) {
        return this.prisma.column.create({
            data: {
                title,
                userId,
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.column.findMany({
            where: {userId},
            include: {cards: true},
        });
    }

    async update(id: number, userId: number, data: Prisma.ColumnUpdateInput) {
        const column = await this.prisma.column.findUnique({where: {id}});

        if (!column) throw new NotFoundException('Колонка не найдена');
        if (column.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.column.update({
            where: {id},
            data,
        });
    }

    async remove(id: number, userId: number) {
        const column = await this.prisma.column.findUnique({where: {id}});

        if (!column) throw new NotFoundException('Колонка не найдена');
        if (column.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.column.delete({where: {id}});
    }
}
