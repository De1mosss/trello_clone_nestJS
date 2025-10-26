import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';


@Module({
  imports: [ColumnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
