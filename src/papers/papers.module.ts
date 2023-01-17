import { Module } from '@nestjs/common';
import { PapersService } from './papers.service';
import { PapersResolver } from './papers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paper } from './entities/paper.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paper]),
    LoggerModule
  ],
  providers: [PapersService, PapersResolver],
  exports: [PapersService]
})
export class PapersModule { }
