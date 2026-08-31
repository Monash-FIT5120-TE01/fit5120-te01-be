import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DevelopmentService } from './development.service.js';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/development')
@ApiTags('Development Activity Monitor')
export class DevelopmentController {
  logger: Logger;
  constructor(private readonly developmentService: DevelopmentService) {}

  @Get('/footprints')
  async findAllFootprints() {
    return await this.developmentService.findAllFootprints();
  }

  @Get('/details/:id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const res = await this.developmentService.findDevDetails(id);

    if (!res) {
      throw new NotFoundException(
        `There is no record of development with ID ${id}`,
      );
    }

    return res;
  }
}
