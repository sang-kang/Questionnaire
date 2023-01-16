import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { Option } from './entities/option.entity';
import { OptionsService } from './options.service';

@Resolver(of => Option)
export class OptionsResolver {

    constructor(private readonly optionService: OptionsService) { }

    @Mutation(returns => Option)
    createUser(@Args('createOptionInput') createOptionInput: CreateOptionInput): Promise<Option> {
        return this.optionService.create(createOptionInput);
    }

    @Query(returns => Option, { name: 'option' })
    findOneById(
        @Args('optionNum') optionNum: number,
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
    ) {
        return this.optionService.findOneBy(optionNum, questionNum, paperId);
    }

    @Query(returns => [Option], { name: 'options' })
    findAll() {
        return this.optionService.findAll();
    }

    @Mutation(returns => Option)
    updateOption(
        @Args('optionNum') optionNum: number,
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
        @Args('updateOptionInput') updateOptionInput: UpdateOptionInput
    ) {
        return this.optionService.update(optionNum, questionNum, paperId, updateOptionInput);
    }

    @Mutation(returns => Option)
    removeOption(
        @Args('optionNum') optionNum: number,
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
    ) {
        return this.optionService.remove(optionNum, questionNum, paperId);
    }

}
