import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { PapersService } from 'src/papers/papers.service';
import { PapersModule } from 'src/papers/papers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    PapersModule
  ],
  providers: [QuestionsService, QuestionsResolver]
})
export class QuestionsModule { }
