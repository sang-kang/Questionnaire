import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { QuestionsService } from './questions.service';

@Resolver(of => Question)
export class QuestionsResolver {

    constructor(private readonly questionService: QuestionsService) { }

    @Mutation(returns => Question)
    createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput): Promise<Question> {
        console.log('questionNum: ', createQuestionInput.questionNum)
        console.log('paperId: ', createQuestionInput.paperId)
        console.log('content: ', createQuestionInput.content)
        
        return this.questionService.create(createQuestionInput);
    }

    @Query(returns => Question, { name: 'question' })
    findOneById(
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
    ) {
        return this.questionService.findOneBy(questionNum, paperId);
    }

    @Query(returns => [Question], { name: 'questions' })
    findAll() {
        return this.questionService.findAll();
    }

    @Mutation(returns => Question)
    updateQuestion(
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
        @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput
    ) {
        return this.questionService.update(questionNum, paperId, updateQuestionInput);
    }

    @Mutation(returns => Question)
    removeQuestion(
        @Args('questionNum') questionNum: number,
        @Args('paperId') paperId: number,
    ) {
        return this.questionService.remove(questionNum, paperId);
    }
}
