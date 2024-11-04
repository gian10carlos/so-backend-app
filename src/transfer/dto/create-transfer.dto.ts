import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransferDto {
    @ApiProperty()
    @IsNumber()
    id_sender: number

    @ApiProperty()
    @IsNumber()
    id_recipient: number

    @ApiProperty()
    @IsNumber({}, { message: 'Amount must be a valid number' })
    amount: number

    @ApiProperty()
    @IsString()
    date: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    message: string
}