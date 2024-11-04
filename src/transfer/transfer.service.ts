import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateTransferDto } from "./dto";

@Injectable()
export class TransferService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(createTransferDto: CreateTransferDto) {
        try {
            const transferDtoData = {

                id_send: createTransferDto.id_send,
                id_received: createTransferDto.id_received,
                amount: createTransferDto.amount,
                date: createTransferDto.date,
            }

            const transfer = await this.prisma.transfer.create({
                data: {
                    ...transferDtoData,
                    message: { create: { message_text: createTransferDto.message_text } }
                },
                select: {
                    id: true,
                    send: true,
                    received: true,
                    amount: true,
                }
            });

            return { ...transfer }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getMe(senderId: number) {
        const transfers = await this.prisma.transfer.findMany({
            where: {
                OR: [
                    { id_send: senderId },
                    { id_received: senderId }
                ]
            }
        });

        return { transfers }
    }
}