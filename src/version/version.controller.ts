import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { VersionService } from "./version.service";
import { CreateVersionDto } from "./dto/create-version.dto";

@ApiTags('Version')
@Controller('version')

export class VersionController {
    constructor(private readonly versionService: VersionService) { }

    @ApiResponse({
        status: 200,
        description: 'Version Created',
        type: CreateVersionDto,
    })

    @Post('create')
    create(@Body() createVersionDto: CreateVersionDto) {
        return this.versionService.create(createVersionDto);
    }

    @Get('')
    getActive() {
        return this.versionService.getActive();
    }
}