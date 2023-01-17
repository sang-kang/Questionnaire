import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PapersService } from 'src/papers/papers.service';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { MyLogger } from 'src/logger/my-loger.service';

@Injectable()
export class QuestionsService {

    constructor(
        private readonly myLogger: MyLogger,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        @Inject(PapersService) private readonly paperService: PapersService
    ) {
        this.myLogger.setContext('QuestionsService');
    }

    async create({ questionNum, paperId, content }: CreateQuestionInput): Promise<Question> {
        const questionExist = await this.questionRepository.findOneBy({
            num: questionNum,
            paperId: paperId
        })

        if (questionExist) {
            this.myLogger.error(`question num ${questionNum} in paper id ${paperId} already exist`);
            throw new BadRequestException(`question num ${questionNum} in paper id ${paperId} already exist`);
        }

        const question = await this.questionRepository.create({
            num: questionNum,
            content: content
        });

        const paper = await this.paperService.findOneBy(paperId);
        if (!paper) {
            this.myLogger.error(`Cannot find the paper ${paperId}.`);
            throw new NotFoundException(`Cannot find the paper ${paperId}.`);
        }

        question.paper = paper;
        return await this.questionRepository.save(question);
    }

    async findAll(): Promise<Array<Question>> {
        return await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect('question.options', 'options')
            .leftJoinAndSelect('question.paper', 'paper')
            .getMany();
    }

    async findOneBy(questionNum: number, paperId: number): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            num: questionNum,
            paperId: paperId
        });

        if (!question) {
            this.myLogger.error(`question num ${questionNum} at paper ${paperId} not found`);
            throw new NotFoundException(`question num ${questionNum} at paper ${paperId} not found`);
        }

        return await this.questionRepository.createQueryBuilder('question')
            .leftJoinAndSelect('question.options', 'options')
            .leftJoinAndSelect('question.paper', 'paper')
            .where('question.num = :questionNum', { questionNum: questionNum })
            .andWhere('question.paperId = :questionPaperId', { questionPaperId: paperId })
            .getOne();
    }

    async update(questionNum: number, paperId: number, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            num: questionNum,
            paperId: paperId
        });

        if (!question) {
            this.myLogger.error(`question num ${questionNum} at paper ${paperId} not found`);
            throw new NotFoundException(`question num ${questionNum} at paper ${paperId} not found`);
        }

        Object.assign(question, updateQuestionInput);
        return await this.questionRepository.save(question);
    }

    async remove(questionNum: number, paperId: number): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            num: questionNum,
            paperId: paperId
        });

        if (!question) {
            this.myLogger.error(`question num ${questionNum} at paper ${paperId} not found`);
            throw new NotFoundException(`question num ${questionNum} at paper ${paperId} not found`);
        }

        return await this.questionRepository.remove(question);
    }
}
