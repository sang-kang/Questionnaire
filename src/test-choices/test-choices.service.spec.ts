import { Test, TestingModule } from '@nestjs/testing';
import { TestChoicesService } from './test-choices.service';

describe('TestChoicesService', () => {
  let service: TestChoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestChoicesService],
    }).compile();

    service = module.get<TestChoicesService>(TestChoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
