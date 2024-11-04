import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { SearchDniDto } from "./dto";

@Injectable()
export class PeopleService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async listPeopleDni(searchDniDto: SearchDniDto) {
        return this.prisma.people.findMany({
            where: {
                dni: {
                    contains: searchDniDto.dni,
                    mode: 'insensitive'
                },
                status: true,
            },
            select: {
                id: true,
                dni: true,
            },
            take: 10,
        })
    }
}