import { Module } from '@nestjs/common';
import { TestChoicesService } from './test-choices.service';
import { TestChoicesResolver } from './test-choices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestChoice } from './entities/test-choice.entity';
import { TestResultsModule } from 'src/test-results/test-results.module';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestChoice]),
    TestResultsModule,
    OptionsModule
  ],
  providers: [TestChoicesService, TestChoicesResolver]
})
export class TestChoicesModule { }
