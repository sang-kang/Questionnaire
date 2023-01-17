import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option]),
    QuestionsModule,
    LoggerModule
  ],
  providers: [OptionsService, OptionsResolver],
  exports: [OptionsService]
})
export class OptionsModule { }
