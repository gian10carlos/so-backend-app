import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./interfaces/jwt.payload.interface";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LogOutUserDto } from "./dto/logout-user.dto";
import { ReniecService } from "./service/reniecService";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly reniecService: ReniecService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {

            const dniData = await this.reniecService.getDniData(createUserDto.dni);
            if (!dniData || !dniData.nombres) {
                throw new BadRequestException('DNI no válido o no encontrado en RENIEC');
            }

            const userExists = await this.prisma.people.findUnique({
                where: { dni: createUserDto.dni },
            });

            if (userExists) {
                throw new BadRequestException('El usuario con este DNI ya existe');
            }

            const userDtoData = {
                dni: createUserDto.dni,
                first_name: dniData.nombres,
                last_name: dniData.apellidoPaterno + dniData.apellidoMaterno,
                code_identity: createUserDto.code_identity,
                card_number: createUserDto.card_number,
                ccv: createUserDto.ccv,
                code_key: createUserDto.code_key,
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
                                ip_log: createUserDto.ip_log,
                                dateInp: createUserDto.dateInp,
                                dateUtil: createUserDto.dateUtil,
                                dateOut: createUserDto.dateOut,
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
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Ocurrió un error inesperado al crear el usuario');
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { dni, password } = loginUserDto;

        try {
            const user = await this.prisma.people.findUnique({
                where: {
                    dni: dni,
                    status: true,
                },
            });

            if (!user) throw new NotFoundException('Usuario no encontrado');

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Contraseña incorrecta');
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
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }
            throw new InternalServerErrorException('Error al intentar iniciar sesión, intente mas tarde');
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