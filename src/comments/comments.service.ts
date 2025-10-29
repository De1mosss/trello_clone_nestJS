import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) {}


    async create(userId: number, dto: CreateCommentDto) {
        const { cardId, content } = dto;

        const card = await this.prisma.card.findUnique({ where: { id: cardId } });
        if (!card) {
            throw new NotFoundException(`Карточка с ID ${cardId} не найдена`);
        }

        return this.prisma.comment.create({
            data: {
                content,
                cardId,
                userId,
            },
        });
    }


    async findByCard(cardId: number) {
        return this.prisma.comment.findMany({
            where: { cardId },
            include: {
                user: {
                    select: { id: true, email: true },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }


    async update(id: number, userId: number, dto: UpdateCommentDto) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            throw new NotFoundException(`Комментарий с ID ${id} не найден`);
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('Вы не можете редактировать чужой комментарий');
        }

        return this.prisma.comment.update({
            where: { id },
            data: { content: dto.content },
        });
    }


    async remove(id: number, userId: number) {
        const comment = await this.prisma.comment.findUnique({ where: { id } });

        if (!comment) {
            throw new NotFoundException(`Комментарий с ID ${id} не найден`);
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('Вы не можете удалить чужой комментарий');
        }

        return this.prisma.comment.delete({
            where: { id },
        });
    }
}
