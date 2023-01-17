import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionsService } from 'src/options/options.service';
import { UpdateTestResultInput } from 'src/test-results/dto/update-test-result.input';
import { TestResultsService } from 'src/test-results/test-results.service';
import { Repository } from 'typeorm';
import { CreateTestChoiceInput } from './dto/create-test-choice.input';
import { UpdateTestChoiceInput } from './dto/update-test-choice.input';
import { TestChoice } from './entities/test-choice.entity';
import { MyLogger } from 'src/logger/my-loger.service';


@Injectable()
export class TestChoicesService {

    constructor(
        private readonly myLogger: MyLogger,
        @InjectRepository(TestChoice) private readonly testChoiceRepository: Repository<TestChoice>,
        @Inject(TestResultsService) private readonly testResultService: TestResultsService,
        @Inject(OptionsService) private readonly optionService: OptionsService
    ) {
        this.myLogger.setContext('TestChoicesService');
    }

    async create({ userId, paperId, questionNum, optionNum }: CreateTestChoiceInput): Promise<TestChoice> {
        const testChoiceExist = await this.testChoiceRepository.findOneBy({
            testResultUserId: userId,
            testResultPaperId: paperId,
            optionNum: optionNum,
            optionQuestionNum: questionNum,
            optionQuestionPaperId: paperId,
        })

        if (testChoiceExist) {
            this.myLogger.error(`user ${userId} alread create option ${optionNum} in question ${questionNum} in paper ${paperId}`);
            throw new BadRequestException(`user ${userId} alread create option ${optionNum} in question ${questionNum} in paper ${paperId}`);
        }

        const option = await this.optionService.findOneBy(optionNum, questionNum, paperId);
        if (!option) {
            this.myLogger.error(`option ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
            throw new NotFoundException(`option ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
        }

        const testChoice = await this.testChoiceRepository.create({
            score: option.score
        });

        const testResult = await this.testResultService.findOneBy(userId, paperId);
        if (!testResult) {
            this.myLogger.error(`test result of user ${userId} of paper ${paperId}`);
            throw new NotFoundException(`test result of user ${userId} of paper ${paperId}`);
        }

        const updateTestResultInput = new UpdateTestResultInput();
        updateTestResultInput.totalScore = testResult.totalScore + testChoice.score;
        const updatedTestResult = await this.testResultService.update(userId, paperId, updateTestResultInput);

        testChoice.testResult = updatedTestResult
        testChoice.option = option

        return await this.testChoiceRepository.save(testChoice);
    }

    async find(userId: number, paperId: number, questionNum: number): Promise<Array<TestChoice>> {
        return await this.testChoiceRepository.createQueryBuilder('testChoice')
            .leftJoinAndSelect('testChoice.testResult', 'testResult')
            .leftJoinAndSelect('testChoice.option', 'option')
            .where('testResult.userId = :testResultUserId', { testResultUserId: userId })
            .andWhere('testResult.paperId = :testResultPaperId', { testResultPaperId: paperId })
            .andWhere('option.questionPaperId = :optionQuestionPaperId', { optionQuestionPaperId: paperId })
            .andWhere('option.questionNum = :optionQuestionNum', { optionQuestionNum: questionNum })
            .getMany();
    }

    async findAll(): Promise<Array<TestChoice>> {
        return await this.testChoiceRepository.createQueryBuilder('testChoice')
            .leftJoinAndSelect('testChoice.testResult', 'testResult')
            .leftJoinAndSelect('testChoice.option', 'option')
            .getMany();
    }

    async update(userId: number, paperId: number, questionNum: number, originalOptionNum: number, updateTestChoiceInput: UpdateTestChoiceInput) {
        const originalTestChoice = await this.testChoiceRepository.findOneBy({
            testResultUserId: userId,
            testResultPaperId: paperId,
            optionNum: originalOptionNum,
            optionQuestionNum: questionNum,
            optionQuestionPaperId: paperId
        });

        const testChoices = await this.testChoiceRepository.find({
            where: {
                testResultUserId: userId,
                testResultPaperId: paperId,
                optionQuestionNum: questionNum,
                optionQuestionPaperId: paperId
            }
        });

        const testChoice = testChoices.find((testChoice) => testChoice.optionNum === originalOptionNum);
        if (!testChoice) {
            this.myLogger.error(`Test choice not found`);
            throw new NotFoundException(`Test choice not found`);
        }

        const isSameOptionNum = testChoices.find((testChoice) => testChoice.optionNum === updateTestChoiceInput.optionNum);
        if (isSameOptionNum) {
            this.myLogger.error(`already choose option ${updateTestChoiceInput.optionNum} in this test question ${questionNum}. choose others.`)
            throw new BadRequestException(`already choose option ${updateTestChoiceInput.optionNum} in this test question ${questionNum}. choose others.`);
        }

        const option = await this.optionService.findOneBy(updateTestChoiceInput.optionNum, questionNum, paperId);
        if (!option) {
            this.myLogger.error(`option ${updateTestChoiceInput.optionNum} in question ${questionNum} in paper ${paperId} not found`);
            throw new NotFoundException(`option ${updateTestChoiceInput.optionNum} in question ${questionNum} in paper ${paperId} not found`);
        }

        const originalScore = testChoice.score;
        const newScore = option.score;
        testChoice.optionNum = updateTestChoiceInput.optionNum;
        testChoice.score = newScore

        const testResult = await this.testResultService.findOneBy(userId, paperId);
        if (!testResult) {
            this.myLogger.error(`test result of user ${userId} of paper ${paperId}`);
            throw new NotFoundException(`test result of user ${userId} of paper ${paperId}`);
        }

        const updateTestResultInput = new UpdateTestResultInput();
        updateTestResultInput.totalScore = testResult.totalScore - originalScore + newScore;
        const updatedTestResult = await this.testResultService.update(userId, paperId, updateTestResultInput);

        testChoice.testResult = updatedTestResult
        testChoice.option = option
        this.remove(userId, paperId, questionNum, originalOptionNum)

        return await this.testChoiceRepository.save(testChoice);
    }


    async remove(userId: number, paperId: number, questionNum: number, optionNum: number): Promise<TestChoice> {
        const testChoice = await this.testChoiceRepository.findOneBy({
            testResultUserId: userId,
            testResultPaperId: paperId,
            optionNum: optionNum,
            optionQuestionNum: questionNum,
            optionQuestionPaperId: paperId
        });

        if (!testChoice) {
            this.myLogger.error(`Option ${optionNum} not found`);
            throw new NotFoundException(`Option ${optionNum} not found`);
        }

        return await this.testChoiceRepository.remove(testChoice);
    }
}
