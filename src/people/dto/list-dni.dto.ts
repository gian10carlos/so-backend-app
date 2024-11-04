import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class ListDniDto {
    @ApiProperty()
    @IsOptional()
    dni: string;
}