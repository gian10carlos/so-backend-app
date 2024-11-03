import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "src/prisma/prisma.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "../interfaces/jwt.payload.interface";
import { People } from "@prisma/client";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: JwtPayload): Promise<People> {
        const { id } = payload;
        const people = await this.prisma.people.findUnique({
            where: { id: Number(id) },
        })

        if (!people) throw new UnauthorizedException('User not found');

        return people;
    }
}

