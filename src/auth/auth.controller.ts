import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiResponse({
        status: 201,
        description: 'User created',
        type: CreateUserDto,
    })

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    @ApiResponse({ status: 200, description: 'User logged in' })
    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @ApiResponse({ status: 200, description: 'User by token found' })
    @Get('user/me')
    @UseGuards(AuthGuard('jwt'))
    async getMe(@Request() req) {
        return this.authService.getMe(req.people.id)
    }
}