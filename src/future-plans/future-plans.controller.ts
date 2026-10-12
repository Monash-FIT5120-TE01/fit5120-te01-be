import { Controller, Get, Query } from '@nestjs/common';
import { FuturePlansService } from './future-plans.service.js';
import { FindQuestionDto } from './dtos/question.dto.js';

@Controller('api/future-plans')
export class FuturePlansController {
  constructor(private readonly futurePlansService: FuturePlansService) {}

  @Get('/projects')
  async findAllProjects() {
    return await this.futurePlansService.findAllProjects();
  }

  @Get('/questions')
  async findQuestionsOfProject(@Query() findQuestionDto: FindQuestionDto) {
    return await this.futurePlansService.findQuestionsOfProject(
      findQuestionDto.projectId,
    );
  }
}
