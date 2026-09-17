import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentController } from './development.controller.js';
import { DevelopmentService } from './development.service.js';

describe('DevelopmentController', () => {
  let controller: DevelopmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopmentController],
      providers: [DevelopmentService],
    }).compile();

    controller = module.get<DevelopmentController>(DevelopmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
