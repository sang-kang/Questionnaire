import { Module } from '@nestjs/common';
import { TestChoicesService } from './test-choices.service';
import { TestChoicesResolver } from './test-choices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestChoice } from './entities/test-choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestChoice])],
  providers: [TestChoicesService, TestChoicesResolver]
})
export class TestChoicesModule { }
