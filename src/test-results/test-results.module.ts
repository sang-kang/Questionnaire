import { Module } from '@nestjs/common';
import { TestResultsService } from './test-results.service';
import { TestResultsResolver } from './test-results.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestResult])
  ],
  providers: [TestResultsService, TestResultsResolver]
})
export class TestResultsModule {}
