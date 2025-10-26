import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CardsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: number, columnId: number, title: string, description?: string) {
        return this.prisma.card.create({
            data: {
                title,
                description,
                userId,
                columnId,
            },
        });
    }

    async findAll(columnId: number, userId: number) {
        return this.prisma.card.findMany({
            where: {
                columnId,
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async update(id: number, userId: number, data: Prisma.CardUpdateInput) {
        const card = await this.prisma.card.findUnique({ where: { id } });

        if (!card) throw new NotFoundException('Карточка не найдена');
        if (card.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.card.update({
            where: { id },
            data,
        });
    }

    async remove(id: number, userId: number) {
        const card = await this.prisma.card.findUnique({ where: { id } });

        if (!card) throw new NotFoundException('Карточка не найдена');
        if (card.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.card.delete({
            where: { id },
        });
    }
}
