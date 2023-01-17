import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionsService } from 'src/options/options.service';
import { UpdateTestResultInput } from 'src/test-results/dto/update-test-result.input';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { TestResultsService } from 'src/test-results/test-results.service';
import { Repository } from 'typeorm';
import { CreateTestChoiceInput } from './dto/create-test-choice.input';
import { UpdateTestChoiceInput } from './dto/update-test-choice.input';
import { TestChoice } from './entities/test-choice.entity';


@Injectable()
export class TestChoicesService {

    constructor(
        @InjectRepository(TestChoice) private readonly testChoiceRepository: Repository<TestChoice>,
        @Inject(TestResultsService) private readonly testResultService: TestResultsService,
        @Inject(OptionsService) private readonly optionService: OptionsService
    ) { }

    async create({ userId, paperId, questionNum, optionNum }: CreateTestChoiceInput): Promise<TestChoice> {
        const testChoiceExist = await this.testChoiceRepository.findOneBy({
            testResultUserId: userId,
            testResultPaperId: paperId,
            optionNum: optionNum,
            optionQuestionNum: questionNum,
            optionQuestionPaperId: paperId,
        })

        if (testChoiceExist) {
            throw new BadRequestException(`user ${userId} alread create option ${optionNum} in question ${questionNum} in paper ${paperId}`);
        }

        const option = await this.optionService.findOneBy(optionNum, questionNum, paperId);
        if (!option) {
            throw new NotFoundException();
        }

        const testChoice = await this.testChoiceRepository.create({
            score: option.score
        });

        const testResult = await this.testResultService.findOneBy(userId, paperId);
        if (!testResult) {
            throw new NotFoundException();
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
            throw new NotFoundException(`Test choice not found`)
        }

        // 바꾸려는 optionNum을, userId, paperId, questionNum에서 이미 선택한적이 있는지도 체크해야 될거같다. 
        const isSameOptionNum = testChoices.find((testChoice) => testChoice.optionNum === updateTestChoiceInput.optionNum);
        if (isSameOptionNum) {
            throw new BadRequestException(`already choose option ${updateTestChoiceInput.optionNum} in this test question ${questionNum}. choose others.`);
        }

        // user가 바꾼 optionNum으로 option을 가지고 와서 
        const option = await this.optionService.findOneBy(updateTestChoiceInput.optionNum, questionNum, paperId);
        if (!option) {
            throw new NotFoundException('Option not found');
        }

        const originalScore = testChoice.score;
        const newScore = option.score;
        // 현재 testChoice의 optionNum을 바꿔주고, score도 그에 맞게 바꿔주고  
        testChoice.optionNum = updateTestChoiceInput.optionNum;
        testChoice.score = newScore

        // 이 testChoice가 속한 testResult의 totalScore도 바꿔주고 
        const testResult = await this.testResultService.findOneBy(userId, paperId);
        if (!testResult) {
            throw new NotFoundException();
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
            throw new NotFoundException(`Option ${optionNum} not found`)
        }

        return await this.testChoiceRepository.remove(testChoice);
    }
}
