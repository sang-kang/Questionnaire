import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestChoiceInput } from './dto/create-test-choice.input';
import { UpdateTestChoiceInput } from './dto/update-test-choice.input';
import { TestChoice } from './entities/test-choice.entity';
import { TestChoicesService } from './test-choices.service';

@Resolver(of => TestChoice)
export class TestChoicesResolver {
    constructor(private readonly testChoiceService: TestChoicesService) { }

    // user가 번호 선택
    @Mutation(returns => TestChoice, { description: 'user serlect option' })
    createTestChoice(@Args('createTestChoiceInput') createTestChoiceInput: CreateTestChoiceInput): Promise<TestChoice> {
        return this.testChoiceService.create(createTestChoiceInput);
    }

    @Query(returns => [TestChoice], { name: 'testChoices' })
    find(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
        @Args('questionNum') questionNum: number
    ) {
        return this.testChoiceService.find(userId, paperId, questionNum);
    }

    @Query(returns => [TestChoice], { name: 'testChoices' })
    findAll() {
        return this.testChoiceService.findAll();
    }

    // user가 선택한 변호 변경
    @Mutation(returns => TestChoice)
    updateTestChoice(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
        @Args('questionNum') questionNum: number,
        @Args('originalOptionNum') originalOptionNum: number,
        @Args('updateTestChoiceInput') updateTestChoiceInput: UpdateTestChoiceInput
    ) {
        return this.testChoiceService.update(userId, paperId, questionNum, originalOptionNum, updateTestChoiceInput)
    }

    // TestChoice는 지우는게 불가능 그러나 테스트 위해서 잠시 만듦
    // @Mutation(returns => TestChoice)
    // removeTestChoice(
    //     @Args('userId') userId: number,
    //     @Args('paperId') paperId: number,
    //     @Args('questionNum') questionNum: number,
    //     @Args('optionNum') optionNum: number,
    // ) {
    //     return this.testChoiceService.remove(userId, paperId, questionNum, optionNum);
    // }
}
