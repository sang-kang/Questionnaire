import { Module } from '@nestjs/common';
import { TestResultsService } from './test-results.service';
import { TestResultsResolver } from './test-results.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { UsersModule } from 'src/users/users.module';
import { PapersModule } from 'src/papers/papers.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestResult]),
    UsersModule,
    PapersModule,
    LoggerModule
  ],
  providers: [TestResultsService, TestResultsResolver],
  exports: [TestResultsService]
})
export class TestResultsModule { }
