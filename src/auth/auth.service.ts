import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { Injectable } from "@nestjs/common";
import { LogOutUserDto } from "./dto/logout-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const userDtoData = {
                dni: createUserDto.dni, // 8 digitos
                first_name: createUserDto.first_name,
                last_name: createUserDto.last_name,
                code_identity: createUserDto.code_identity, // 1 digito
                card_number: createUserDto.card_number, // 14 caracteres
                ccv: createUserDto.ccv, // 3 digitos
                code_key: createUserDto.code_key // 4 digitos
            };

            const [user] = await this.prisma.$transaction([
                this.prisma.people.create({
                    data: {
                        ...userDtoData,
                        password: bcrypt.hashSync(createUserDto.password, 10),
                        token: "",
                        person_balances: { create: { amount: createUserDto.amount } },
                        accounts: {
                            create: {
                                ip_log: createUserDto.ip_log, // IP public
                                dateInp: createUserDto.dateInp, // date and hour
                                dateUtil: createUserDto.dateUtil, // dateInp - dateOut
                                dateOut: createUserDto.dateOut, // date and hour
                            }
                        },
                    },
                    select: {
                        id: true,
                        dni: true,
                        accounts: {
                            select: { id: true }
                        }
                    }
                }),
            ]);

            const token = this.getJwtToken({
                id: user.id.toString(),
                id_account: user.accounts[0].id.toString(),
            })

            const updateRegister = await this.prisma.people.update({
                where: { id: user.id },
                data: { token: token },
                select: {
                    id: true,
                    dni: true,
                    token: true,
                    accounts: {
                        select: { id: true }
                    }
                }
            })

            return updateRegister;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { dni, password } = loginUserDto;

        try {
            const user = await this.prisma.people.findUnique({
                where: { dni },
            });

            if (!user) throw new Error('User not found');

            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error('Invalid Password');
            }

            const account = await this.prisma.account.create({
                data: {
                    id_people: user.id,
                    dateInp: loginUserDto.dateInp,
                    ip_log: loginUserDto.ip_log,
                },
            })

            return {
                ...user,
                token: this.getJwtToken({
                    id: user.id.toString(),
                    id_account: account.id.toString(),
                })
            }
        } catch (error) {
            throw Error(error);
        }
    }

    async logout(logOutUserDto: LogOutUserDto) {
        await this.prisma.account.update({
            where: {
                id: Number(logOutUserDto.id)
            },
            data: {
                dateUtil: logOutUserDto.dateUtil,
                dateOut: logOutUserDto.dateOut,
            }
        });

        return {
            dateOut: logOutUserDto.dateOut
        }
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }

    async getMe(userId: string) {
        const user = await this.prisma.people.findUnique({
            where: { id: Number(userId) },
        })

        if (!user) throw new Error('User not found');

        return { user }
    }
}