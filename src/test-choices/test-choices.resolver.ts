import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTestChoiceInput } from './dto/create-test-choice.input';
import { TestChoice } from './entities/test-choice.entity';
import { TestChoicesService } from './test-choices.service';

@Resolver(of => TestChoice)
export class TestChoicesResolver {
    constructor(private readonly testChoiceService: TestChoicesService) { }

    @Mutation(returns => TestChoice, { description: 'user serlect option' })
    createTestChoice(@Args('createTestChoiceInput') createTestChoiceInput: CreateTestChoiceInput): Promise<TestChoice> {
        return this.testChoiceService.create(createTestChoiceInput);
    }
}
