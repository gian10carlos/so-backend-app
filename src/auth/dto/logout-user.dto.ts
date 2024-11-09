import { IsOptional, IsString } from "class-validator";

export class LogOutUserDto {
    @IsString()
    id: string

    @IsString()
    dateUtil: string

    @IsString()
    dateOut: string
}