import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userId: number, dto: CreateColumnDto) {
        return this.prisma.column.create({
            data: {
                title: dto.title,
                userId,
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.column.findMany({
            where: { userId },
            include: { cards: true },
        });
    }

    async update(id: number, userId: number, dto: UpdateColumnDto) {
        return this.prisma.column.updateMany({
            where: { id, userId },
            data: { title: dto.title },
        });
    }

    async remove(id: number, userId: number) {
        return this.prisma.column.deleteMany({
            where: { id, userId },
        });
    }
}
