import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {CreateCardDto} from "./dto/create-card.dto";

@Injectable()
export class CardsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: number, dto: CreateCardDto) {
        const { columnId, title, description } = dto;
        return this.prisma.card.create({
            data: {
                columnId,
                title,
                description,
                userId,
            },
        });
    }

    async findAllByColumn(columnId: number) {
        return this.prisma.card.findMany({
            where: { columnId },
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
