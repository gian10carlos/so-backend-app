import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateTransferDto } from "./dto";

@Injectable()
export class TransferService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createTransferDto: CreateTransferDto) {
        try {
            const messageData = createTransferDto.message?.trim()
                ? { create: { message: createTransferDto.message } }
                : undefined;

            const transfer = await this.prisma.transfer.create({
                data: {
                    sender: { connect: { id: createTransferDto.senderId } },
                    recipient: { connect: { id: createTransferDto.recipientId } },
                    amount: createTransferDto.amount,
                    date: new Date(createTransferDto.date),
                    messages: messageData,
                },
                select: {
                    id: true,
                    sender: { select: { id: true, dni: true } },
                    recipient: { select: { id: true, dni: true } },
                    amount: true,
                },
            });

            return transfer;
        } catch (error) {
            console.error(error);
            throw new Error('Error al crear la transferencia');
        }
    }

    async getMe(senderId: number) {
        const transfers = await this.prisma.transfer.findMany({
            where: {
                OR: [
                    { senderId: senderId },
                    { recipientId: senderId },
                ],
            },
            include: {
                sender: true,
                recipient: true,
                messages: true,
            },
        });

        return { transfers };
    }
}
