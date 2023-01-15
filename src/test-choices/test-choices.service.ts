import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestChoice } from './entities/test-choice.entity';


@Injectable()
export class TestChoicesService {

    constructor(@InjectRepository(TestChoice) private readonly userRepository: Repository<TestChoice>) { }
}
