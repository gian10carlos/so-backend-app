import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { Injectable } from "@nestjs/common";

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
                code_identity: createUserDto.code_identity, // 1 digito
                card_number: createUserDto.card_number, // 14 caracteres
                ccv: createUserDto.ccv, // 3 digitos
                code_key: createUserDto.code_key // 4 digitos
            };

            const token = this.getJwtToken({ id: createUserDto.dni });

            const user = await this.prisma.people.create({
                data: {
                    ...userDtoData,
                    password: bcrypt.hashSync(createUserDto.password, 10),
                    token: token,
                    person_balances: {
                        create: { amount: Number(createUserDto.amount) }
                    },
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
                }
            })

            return {
                ...user,
                token: this.getJwtToken({ id: user.id.toString() })
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { dni, password } = loginUserDto;

        const user = await this.prisma.people.findUnique({
            where: { dni },
        });

        if (!user) throw new Error('User not found');

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid Password');
        }

        return {
            ...user,
            token: this.getJwtToken({ id: user.id.toString() })
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