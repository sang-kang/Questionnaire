import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTestResultInput } from './dto/update-test-result.input';
import { TestResult } from './entities/test-result.entity';


@Injectable()
export class TestResultsService {
    constructor(@InjectRepository(TestResult) private readonly testResultRepository: Repository<TestResult>) { }

    async findAll(): Promise<Array<TestResult>> {
        return await this.testResultRepository.find();
    }

    async findOneById(userId: number, paperId: number): Promise<TestResult> {
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
