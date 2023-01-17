import { Injectable, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { PapersService } from 'src/papers/papers.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTestResultInput } from './dto/create-test-result.input';
import { UpdateTestResultInput } from './dto/update-test-result.input';
import { TestResult } from './entities/test-result.entity';
import { MyLogger } from 'src/logger/my-loger.service';


@Injectable()
export class TestResultsService {
    constructor(
        private readonly myLogger: MyLogger,
        @InjectRepository(TestResult) private readonly testResultRepository: Repository<TestResult>,
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(PapersService) private readonly paperService: PapersService
    ) {
        this.myLogger.setContext('TestResultsService');
    }

    async create({ userId, paperId }: CreateTestResultInput): Promise<TestResult> {
        const testResultExist = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (testResultExist) {
            this.myLogger.error(`user ${userId} already did or doing ${paperId}`)
            throw new BadRequestException(`user ${userId} already did or doing ${paperId}`);
        }

        const testResult = await this.testResultRepository.create({
            totalScore: 0,
            isSubmitted: false
        });

        const user = await this.userService.findOneById(userId);
        if (!user) {
            this.myLogger.error(`user: ${userId} not found`)
            throw new NotFoundException(`user: ${userId} not found`);
        }

        const paper = await this.paperService.findOneBy(paperId);
        if (!paper) {
            this.myLogger.error(`paper: ${paperId} not found`);
            throw new NotFoundException(`paper: ${paperId} not found`);
        }

        testResult.user = user;
        testResult.paper = paper

        return await this.testResultRepository.save(testResult);
    }

    async findAll(): Promise<Array<TestResult>> {
        return await this.testResultRepository.createQueryBuilder('testResult')
            .leftJoinAndSelect('testResult.user', 'user')
            .leftJoinAndSelect('testResult.paper', 'paper')
            .leftJoinAndSelect('testResult.testChoices', 'testChoices')
            .getMany();
    }

    async findOneBy(userId: number, paperId: number): Promise<TestResult> {
        const testResult = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (!testResult) {
            this.myLogger.error(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
            throw new NotFoundException(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
        }

        return await this.testResultRepository.createQueryBuilder('testResult')
            .leftJoinAndSelect('testResult.user', 'user')
            .leftJoinAndSelect('testResult.paper', 'paper')
            .leftJoinAndSelect('testResult.testChoices', 'testChoices')
            .where('testResult.userId = :testResultUserId', { testResultUserId: userId })
            .andWhere('testResult.paperId = :testResultPaperId', { testResultPaperId: paperId })
            .getOne();
    }

    async update(userId: number, paperId: number, updateTestResultInput: Partial<UpdateTestResultInput>): Promise<TestResult> {
        const testResult = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (!testResult) {
            this.myLogger.error(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
            throw new NotFoundException(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
        }

        Object.assign(testResult, updateTestResultInput);
        return await this.testResultRepository.save(testResult);
    }

    async remove(userId: number, paperId: number): Promise<TestResult> {
        const testResult = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (!testResult) {
            this.myLogger.error(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
            throw new NotFoundException(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
        }

        return await this.testResultRepository.remove(testResult);
    }

    async findAllSubmittedTestResults() {
        return await this.testResultRepository.createQueryBuilder('testResult')
            .leftJoinAndSelect('testResult.user', 'user')
            .leftJoinAndSelect('testResult.paper', 'paper')
            .leftJoinAndSelect('testResult.testChoices', 'testChoices')
            .where('testResult.isSubmitted = :isSubmitted', { isSubmitted: true })
            .getMany();
    }
}
