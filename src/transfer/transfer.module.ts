import { Module } from "@nestjs/common";
import { TransferController } from "./transfer.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { TransferService } from "./transfer.service";
import { ConfigModule } from "@nestjs/config";
import { prismaModule } from "@/prisma/prima.module";

@Module({
    controllers: [TransferController],
    providers: [PrismaService, TransferService],
    imports: [
        ConfigModule,
        prismaModule,
    ]
})

export class TransferModule { }