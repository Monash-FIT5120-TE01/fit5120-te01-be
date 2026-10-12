import { Test, TestingModule } from '@nestjs/testing';
import { FuturePlansController } from './future-plans.controller.js';
import { FuturePlansService } from './future-plans.service.js';

describe('FuturePlansController', () => {
  let controller: FuturePlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuturePlansController],
      providers: [FuturePlansService],
    }).compile();

    controller = module.get<FuturePlansController>(FuturePlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
