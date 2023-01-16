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


@Injectable()
export class TestResultsService {
    constructor(
        @InjectRepository(TestResult) private readonly testResultRepository: Repository<TestResult>,
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(PapersService) private readonly paperService: PapersService
    ) { }

    async create({ userId, paperId }: CreateTestResultInput): Promise<TestResult> {
        // 무결성 체크
        const testResultExist = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (testResultExist) {
            throw new BadRequestException(`user ${userId} already did or doing ${paperId}`);
        }

        const testResult = await this.testResultRepository.create({
            totalScore: 0,
            isSubmitted: false
        });

        const user = await this.userService.findOneById(userId);
        if (!user) {
            throw new NotFoundException(`user: ${userId} not found`);
        }

        const paper = await this.paperService.findOneBy(paperId);
        if (!paper) {
            throw new NotFoundException(`paper: ${paperId} not found`);
        }

        testResult.user = user;
        testResult.paper = paper

        return await this.testResultRepository.save(testResult);
    }

    async findAll(): Promise<Array<TestResult>> {
        return await this.testResultRepository.find();
    }

    async findOneBy(userId: number, paperId: number): Promise<TestResult> {
        const testResult = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (!testResult) {
            throw new NotFoundException(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
        }

        return testResult;
    }

    async update(userId: number, paperId: number, updateTestResultInput: UpdateTestResultInput): Promise<TestResult> {
        // const user = await this.userRepository.preload({
        //     id: id,
        //     ...updateUserInput,
        // });

        const testResult = await this.testResultRepository.findOneBy({
            userId: userId,
            paperId: paperId
        });

        if (!testResult) {
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
            throw new NotFoundException(`TestResult of userId: ${userId} and paperId: ${paperId} not found`);
        }

        return await this.testResultRepository.remove(testResult);
    }
}
