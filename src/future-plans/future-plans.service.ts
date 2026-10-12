import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity.js';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity.js';
import { QASource } from './entities/qa-source.entity.js';

@Injectable()
export class FuturePlansService {
  constructor(
    @InjectRepository(Project)
    private readonly _projectRepository: Repository<Project>,

    @InjectRepository(Question)
    private readonly _questionRepository: Repository<Question>,

    @InjectRepository(QASource)
    private readonly _qaSourceRepository: Repository<QASource>,
  ) {}

  async findAllProjects(): Promise<Project[]> {
    const query = await this._projectRepository.find();
    return query;
  }

  async findQuestionsOfProject(projectId: number): Promise<Question[]> {
    const query = await this._questionRepository.find({
      where: { projectId: projectId },
      relations: { sources: true },
    });
    return query;
  }
}
