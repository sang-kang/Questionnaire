import { Resolver } from '@nestjs/graphql';
import { TestChoice } from './entities/test-choice.entity';
import { TestChoicesService } from './test-choices.service';

@Resolver(of => TestChoice)
export class TestChoicesResolver {
    constructor(private readonly testChoiceService: TestChoicesService) { }
}
