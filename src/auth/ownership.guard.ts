import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;
        const { id } = request.params;

        if (!id) throw new NotFoundException('Не указан ID сущности');

        const handlerPath = request.route.path;
        let entityType: 'column' | 'card' | 'comment' | null = null;

        if (handlerPath.includes('columns')) entityType = 'column';
        else if (handlerPath.includes('cards')) entityType = 'card';
        else if (handlerPath.includes('comments')) entityType = 'comment';

        if (!entityType) {
            throw new ForbiddenException('Неизвестный тип сущности');
        }

        let entity;
        switch (entityType) {
            case 'column':
                entity = await this.prisma.column.findUnique({ where: { id: +id } });
                break;
            case 'card':
                entity = await this.prisma.card.findUnique({ where: { id: +id } });
                break;
            case 'comment':
                entity = await this.prisma.comment.findUnique({ where: { id: +id } });
                break;
        }

        if (!entity) throw new NotFoundException('Сущность не найдена');
        if (entity.userId !== userId) {
            throw new ForbiddenException('У вас нет прав для этого действия');
        }

        return true;
    }
}
