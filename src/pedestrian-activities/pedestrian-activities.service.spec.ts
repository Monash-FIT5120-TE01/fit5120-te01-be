import { Test, TestingModule } from '@nestjs/testing';
import { PedestrianActivitiesService } from './pedestrian-activities.service.js';

describe('PedestrianActivitiesService', () => {
  let service: PedestrianActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedestrianActivitiesService],
    }).compile();

    service = module.get<PedestrianActivitiesService>(PedestrianActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
