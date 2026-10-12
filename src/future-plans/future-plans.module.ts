import { Module } from '@nestjs/common';
import { FuturePlansService } from './future-plans.service.js';
import { FuturePlansController } from './future-plans.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity.js';
import { Question } from './entities/question.entity.js';
import { QASource } from './entities/qa-source.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Question, QASource])],
  controllers: [FuturePlansController],
  providers: [FuturePlansService],
})
export class FuturePlansModule {}
