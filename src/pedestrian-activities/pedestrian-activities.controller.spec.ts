import { Test, TestingModule } from '@nestjs/testing';
import { PedestrianActivitiesController } from './pedestrian-activities.controller.js';
import { PedestrianActivitiesService } from './pedestrian-activities.service.js';

describe('PedestrianActivitiesController', () => {
  let controller: PedestrianActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedestrianActivitiesController],
      providers: [PedestrianActivitiesService],
    }).compile();

    controller = module.get<PedestrianActivitiesController>(PedestrianActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
