import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { prismaModule } from "../prisma/prima.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from "../prisma/prisma.service";
import { JwtStrategy } from "./strategies/jwt.strategiy";
import { ReniecService } from "./service/reniecService";

@Module({
    controllers: [AuthController],
    providers: [PrismaService, AuthService, JwtStrategy, ReniecService],
    imports: [
        ConfigModule,
        prismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '3m' },
                };
            }
        })
    ]
})

export class AuthModule { };