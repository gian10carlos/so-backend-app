import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    id: number

    @ApiProperty()
    @MinLength(8)
    @MaxLength(8)
    @IsString()
    dni: string;

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
    @IsString()
    dateInp: string;

    @ApiProperty()
    @IsString()
    ip_log: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    dateUtil: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    dateOut: string;
}