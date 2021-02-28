import { Test, TestingModule } from '@nestjs/testing';
import { SubTopicsController } from './subtopics.controller';
import { SubTopicsService } from './subtopics.service';

describe('TopicsController', () => {
  let controller: SubTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubTopicsController],
      providers: [SubTopicsService],
    }).compile();

    controller = module.get<SubTopicsController>(SubTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
