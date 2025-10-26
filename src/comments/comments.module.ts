import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
    imports: [JwtModule.register({})],
    controllers: [CommentsController],
    providers: [CommentsService, PrismaService, JwtStrategy],
})
export class CommentsModule {}
