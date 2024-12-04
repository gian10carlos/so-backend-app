import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateVersionDto } from "./dto/create-version.dto";


@Injectable()
export class VersionService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(createVersionDto: CreateVersionDto) {
        try {
            const version = await this.prisma.version.create({
                data: {
                    ...createVersionDto,
                    status: true,
                },
                select: {
                    id: true,
                    version: true,
                    create_at: true,
                }
            })
            return version;
        } catch (error) {
            throw new Error('Error create version: ' + error);
        }
    }

    async getActive() {
        try {
            const activeVersion = await this.prisma.version.findFirst({
                where: {
                    status: true
                },
                select: {
                    version: true,
                    status: true,
                }
            });

            if (!activeVersion) throw new Error('No active version');

            return activeVersion;
        } catch (error) {
            throw new Error('Error get active version: ' + error);
        }
    }
}