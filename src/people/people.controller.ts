import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PeopleService } from "./people.service";
import { SearchDniDto } from "./dto";

@ApiTags('People')
@Controller('people')
export class PeopleController {
    constructor(
        private readonly peopleService: PeopleService
    ) { }

    @ApiResponse({ status: 200, description: 'List query dni' })
    @Post('list')
    listPeopleByDni(@Body() searchDniDto: SearchDniDto) {
        return this.peopleService.listPeopleDni(searchDniDto);
    }
}