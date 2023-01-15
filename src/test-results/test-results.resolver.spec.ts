import { Test, TestingModule } from '@nestjs/testing';
import { TestResultsResolver } from './test-results.resolver';

describe('TestResultsResolver', () => {
  let resolver: TestResultsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestResultsResolver],
    }).compile();

    resolver = module.get<TestResultsResolver>(TestResultsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
