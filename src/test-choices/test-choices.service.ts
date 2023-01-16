import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionsService } from 'src/options/options.service';
import { UpdateTestResultInput } from 'src/test-results/dto/update-test-result.input';
import { TestResultsService } from 'src/test-results/test-results.service';
import { Repository } from 'typeorm';
import { CreateTestChoiceInput } from './dto/create-test-choice.input';
import { TestChoice } from './entities/test-choice.entity';


@Injectable()
export class TestChoicesService {

    constructor(
        @InjectRepository(TestChoice) private readonly testChoiceRepository: Repository<TestChoice>,
        @Inject(TestResultsService) private readonly testResultService: TestResultsService,
        @Inject(OptionsService) private readonly optionService: OptionsService
    ) { }

    async create({ userId, paperId, questionNum, optionNum }: CreateTestChoiceInput): Promise<TestChoice> {
        console.log('userId: ', userId);
        console.log('paperId: ', paperId);
        console.log('questionNum: ', questionNum);
        console.log('optionNum: ', optionNum);
        // 무결성? 일관성? 체크
        const testChoiceExist = await this.testChoiceRepository.findOneBy({
            testResultUserId: userId,
            testResultPaperId: paperId,
            optionNum: optionNum,
            optionQuestionNum: questionNum,
            optionQuestionPaperId: paperId,
        })
        console.log('testChoiceExist: ', testChoiceExist)

        if (testChoiceExist) {
            throw new BadRequestException(`user ${userId} alread create option ${optionNum} in question ${questionNum} in paper ${paperId}`);
        }

        const option = await this.optionService.findOneBy(optionNum, questionNum, paperId);
        if (!option) {
            throw new NotFoundException();
        }
        console.log('option: ', option);

        const testChoice = await this.testChoiceRepository.create({
            score: option.score
        });

        const testResult = await this.testResultService.findOneBy(userId, paperId);
        if (!testResult) {
            throw new NotFoundException();
        }

        const updateTestResultInput = new UpdateTestResultInput();
        updateTestResultInput.totalScore = testResult.totalScore + testChoice.score;
        const updatedTestResult = await this.testResultService.update(userId, paperId, updateTestResultInput)

        testChoice.testResult = updatedTestResult
        testChoice.option = option
        console.log('testChoice: ', testChoice);

        return await this.testChoiceRepository.save(testChoice);
    }
}
