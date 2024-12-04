import { PrismaService } from "@/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { VersionService } from "./version.service";
import { ConfigModule } from "@nestjs/config";
import { prismaModule } from "@/prisma/prima.module";
import { VersionController } from "./version.controller";

@Module({
    controllers: [VersionController],
    providers: [
        PrismaService,
        VersionService
    ],
    imports: [
        ConfigModule,
        prismaModule,
    ],
})

export class VersionModule { }