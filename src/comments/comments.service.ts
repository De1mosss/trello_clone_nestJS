import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, cardId: number, content: string) {
        return this.prisma.comment.create({
            data: {
                content,
                userId,
                cardId,
            },
        });
    }

    async findAll(cardId: number) {
        return this.prisma.comment.findMany({
            where: { cardId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async update(id: number, userId: number, content: string) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment) throw new NotFoundException('Комментарий не найден');
        if (comment.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.comment.update({
            where: { id },
            data: { content },
        });
    }

    async remove(id: number, userId: number) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });
        if (!comment) throw new NotFoundException('Комментарий не найден');
        if (comment.userId !== userId) throw new ForbiddenException('Нет доступа');

        return this.prisma.comment.delete({ where: { id } });
    }
}
