import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransferDto {
    @ApiProperty()
    @IsInt()
    id_send: number;

    @ApiProperty()
    @IsInt()
    id_received: number;

    @ApiProperty()
    @IsNumber({}, { message: 'Amount must be a valid number' })
    amount: number;

    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    message_text: string;
}
