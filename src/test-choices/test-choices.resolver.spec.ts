import { Test, TestingModule } from '@nestjs/testing';
import { TestChoicesResolver } from './test-choices.resolver';

describe('TestChoicesResolver', () => {
  let resolver: TestChoicesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestChoicesResolver],
    }).compile();

    resolver = module.get<TestChoicesResolver>(TestChoicesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
