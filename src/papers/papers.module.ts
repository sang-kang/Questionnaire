import { Module } from '@nestjs/common';
import { PapersService } from './papers.service';
import { PapersResolver } from './papers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paper } from './entities/paper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paper])
  ],
  providers: [PapersService, PapersResolver],
  exports: [PapersService]
})
export class PapersModule { }
