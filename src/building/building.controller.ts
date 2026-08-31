import {
  Controller,
  Get,
  Param,
  Logger,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BuildingService } from './building.service.js';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/building')
@ApiTags('Building')
export class BuildingController {
  logger: Logger;
  constructor(private readonly buildingService: BuildingService) {}

  @Get('/footprints')
  async findAllFootprints() {
    return await this.buildingService.findAllFootprints();
  }

  @Get('/details/:id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const res = await this.buildingService.findBuildingDetails(id);

    if (!res) {
      throw new NotFoundException(
        `There is no record of building with ID ${id}`,
      );
    }

    return res;
  }
}
