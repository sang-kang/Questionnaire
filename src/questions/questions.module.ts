import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { PapersModule } from 'src/papers/papers.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    PapersModule,
    LoggerModule
  ],
  providers: [QuestionsService, QuestionsResolver],
  exports:[QuestionsService]
})
export class QuestionsModule { }
