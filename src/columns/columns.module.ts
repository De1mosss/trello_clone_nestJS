import {Module} from '@nestjs/common';
import {ColumnsService} from './columns.service';
import {ColumnsController} from './columns.controller';
import {PrismaService} from '../prisma/prisma.service';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from '../auth/jwt.strategy';

@Module({
    imports: [JwtModule.register({})],
    controllers: [ColumnsController],
    providers: [ColumnsService, PrismaService, JwtStrategy],
})
export class ColumnsModule {
}
