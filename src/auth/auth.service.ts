import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {
    }

    async register(email: string, password: string) {
        // Проверяем, существует ли пользователь
        const existingUser = await this.prisma.user.findUnique({where: {email}});
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({where: {email}});
        if (!user) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const payload = {sub: user.id, email: user.email};
        const access_token = this.jwtService.sign(payload);

        return {access_token};
    }
}
