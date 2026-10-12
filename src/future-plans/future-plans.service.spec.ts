import { Test, TestingModule } from '@nestjs/testing';
import { FuturePlansService } from './future-plans.service.js';

describe('FuturePlansService', () => {
  let service: FuturePlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuturePlansService],
    }).compile();

    service = module.get<FuturePlansService>(FuturePlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
