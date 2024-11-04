import { Module } from "@nestjs/common";
import { PeopleController } from "./people.controller";
import { PrismaService } from "@/prisma/prisma.service";
import { PeopleService } from "./people.service";
import { ConfigModule } from "@nestjs/config";
import { prismaModule } from "@/prisma/prima.module";

@Module({
    controllers: [PeopleController],
    providers: [PrismaService, PeopleService],
    imports: [
        ConfigModule,
        prismaModule,
    ]
})

export class PeopleModule { };