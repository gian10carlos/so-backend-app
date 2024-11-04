import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransferService } from "./transfer.service";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTransferDto } from "./dto";

@ApiTags('Transfer')
@Controller('transfer')

export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @ApiResponse({
        status: 201,
        description: 'Transfer created',
        type: CreateTransferDto,
    })

    @Post('create')
    create(@Body() createTransferDto: CreateTransferDto) {
        return this.transferService.create(createTransferDto);
    }

    @Get(':id_sender')
    getMe(@Param('id_sender') id: string) {
        return this.transferService.getMe(Number(id))
    }
}