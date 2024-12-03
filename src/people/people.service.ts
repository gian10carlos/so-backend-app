import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { SearchDniDto } from "./dto";

@Injectable()
export class PeopleService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async listPeopleDni(searchDniDto: SearchDniDto) {
        const { dni, id } = searchDniDto;
        return this.prisma.people.findMany({
            where: {
                dni: {
                    contains: dni,
                    mode: 'insensitive'
                },
                status: true,
                id: { not: Number(id) },
            },
            select: {
                id: true,
                dni: true,
            },
            take: 5,
        })
    }
}