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
                id_sender: createTransferDto.id_sender,
                id_recipient: createTransferDto.id_recipient,
                amount: createTransferDto.amount,
                date: createTransferDto.date,
            }

            const messageData = createTransferDto.message && createTransferDto.message.trim() !== ''
                ? { create: { message: createTransferDto.message } }
                : undefined;

            const transfer = await this.prisma.transfer.create({
                data: {
                    ...transferDtoData,
                    messages: messageData,
                },
                select: {
                    id: true,
                    id_sender: true,
                    id_recipient: true,
                    amount: true,
                }
            })

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
                    { sender: { id: senderId } },
                    { recipient: { id: senderId } }
                ]
            }
        });

        return { transfers }
    }
}