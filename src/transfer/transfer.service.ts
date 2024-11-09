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
                    id_send: true,
                    id_received: true,
                    amount: true,
                    message: {
                        select: {
                            message_text: true,
                        },
                    },
                }
            });

            const persBalSend = await this.prisma.personBalances.findFirst({
                where: { id_people: createTransferDto.id_send }
            })

            const persBalReceiv = await this.prisma.personBalances.findFirst({
                where: { id_people: createTransferDto.id_received }
            })

            await this.prisma.personBalances.update({
                where: { id_people: createTransferDto.id_send },
                data: { amount: persBalSend.amount - createTransferDto.amount }
            })
            await this.prisma.personBalances.update({
                where: { id_people: createTransferDto.id_received },
                data: { amount: persBalReceiv.amount + createTransferDto.amount }
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
                    { id_send: senderId },
                    { id_received: senderId }
                ]
            }
        });

        const people = await this.prisma.people.findFirst({
            where: { id: senderId },
            select: {
                first_name: true,
                person_balances: { select: { amount: true } }
            }
        })

        return { ...transfers, people }
    }
}