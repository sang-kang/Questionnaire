import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTestResultInput } from './dto/create-test-result.input';
import { UpdateTestResultInput } from './dto/update-test-result.input';
import { TestResult } from './entities/test-result.entity';
import { TestResultsService } from './test-results.service';

@Resolver(of => TestResult)
export class TestResultsResolver {

    constructor(private readonly testResultService: TestResultsService) { }

    @Mutation(returns => TestResult)
    createTestResult(@Args('createTestResultInput') createTestResultInput: CreateTestResultInput) {
        return this.testResultService.create(createTestResultInput);
    }

    @Query(returns => TestResult, { name: 'testResult' })
    findOneById(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
    ) {
        return this.testResultService.findOneBy(userId, paperId);
    }

    @Query(returns => [TestResult], { name: 'testResults' })
    findAll() {
        return this.testResultService.findAll();
    }

    @Mutation(returns => TestResult)
    updateTestResult(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
        @Args('updateTestResultInput') updateTestResultInput: UpdateTestResultInput
    ) {
        return this.testResultService.update(userId, paperId, updateTestResultInput);
    }

    @Mutation(returns => TestResult)
    removeTestResult(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
    ) {
        return this.testResultService.remove(userId, paperId);
    }

    @Mutation(returns => TestResult)
    submitTestResult(
        @Args('userId') userId: number,
        @Args('paperId') paperId: number,
        @Args('updateTestResultInput') updateTestResultInput: UpdateTestResultInput
    ) {
        return this.testResultService.update(userId, paperId, updateTestResultInput)
    }

    @Query(returns => [TestResult])
    findAllSubmittedTestResults() {
        return this.testResultService.findAllSubmittedTestResults();
    }

}
