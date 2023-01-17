import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePaperInput } from './dto/create-paper.input';
import { UpdatePaperInput } from './dto/update-paper.input';
import { Paper } from './entities/paper.entity';
import { PapersService } from './papers.service';

@Resolver(of => Paper)
export class PapersResolver {

    constructor(private readonly papersService: PapersService) { }

    @Mutation(returns => Paper)
    createPaper(@Args('createPaperInput') createPaperInput: CreatePaperInput): Promise<Paper> {
        return this.papersService.create(createPaperInput);
    }

    @Query(returns => Paper, { name: 'paper' })
    findOneById(@Args('id') id: number) {
        return this.papersService.findOneBy(id);
    }

    @Query(returns => [Paper], { name: 'papers' })
    findAll() {
        return this.papersService.findAll();
    }

    @Mutation(returns => Paper)
    updatePaper(
        @Args('id') id: number,
        @Args('updatePaperInput') updatePaperInput: UpdatePaperInput,
    ) {
        return this.papersService.update(id, updatePaperInput);
    }

    @Mutation(returns => Paper)
    removePaper(@Args('id') id: number) {
        return this.papersService.remove(id);
    }
}
