import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {Prisma} from '@prisma/client';

@Injectable()
export class ColumnsService {
    constructor(private prisma: PrismaService) {
    }

    async create(data: Prisma.ColumnCreateInput, userId: number) {
        return this.prisma.column.create({
            data: {
                ...data,
                user: {connect: {id: userId}},
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.column.findMany({
            where: {userId},
            include: {cards: true},
        });
    }

    async update(id: number, data: Prisma.ColumnUpdateInput) {
        return this.prisma.column.update({
            where: {id},
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.column.delete({
            where: {id},
        });
    }
}
