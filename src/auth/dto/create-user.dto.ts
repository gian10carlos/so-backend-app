import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { isFloat32Array } from "util/types";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    dni: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1)
    @IsOptional()
    code_identity?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    card_number?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    ccv?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    code_key?: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    token?: string;

    @ApiProperty()
    @IsOptional()
    @IsOptional()
    amount: string;

    @ApiProperty()
    @IsString()
    ip_log: string

    @ApiProperty()
    @IsString()
    dateInp: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    dateUtil: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    dateOut: string
}