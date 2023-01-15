import { Test, TestingModule } from '@nestjs/testing';
import { PapersResolver } from './papers.resolver';

describe('PapersResolver', () => {
  let resolver: PapersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PapersResolver],
    }).compile();

    resolver = module.get<PapersResolver>(PapersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
