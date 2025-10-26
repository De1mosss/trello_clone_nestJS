import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(email: string, password: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: {email},
        });
        if (existingUser) {
            throw new UnauthorizedException('Пользователь с таким email уже существует');
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
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
        };
    }
}
