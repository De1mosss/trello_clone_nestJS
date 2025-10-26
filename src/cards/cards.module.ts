import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
    imports: [JwtModule.register({})],
    controllers: [CardsController],
    providers: [CardsService, PrismaService, JwtStrategy],
})
export class CardsModule {}
