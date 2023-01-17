import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PapersService } from 'src/papers/papers.service';
import { Repository } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        @Inject(PapersService) private readonly paperService: PapersService
    ) { }

    async create({ questionNum, paperId, content }: CreateQuestionInput): Promise<Question> {
        // 무결성? 일관성? 체크
        const questionExist = await this.questionRepository.findOneBy({
            num: questionNum,
            paperId: paperId
        })

        if (questionExist) {
            throw new BadRequestException(`question num ${questionNum} in paper id ${paperId} already exist`);
        }

        const question = await this.questionRepository.create({
            num: questionNum,
            content: content
        });

        const paper = await this.paperService.findOneBy(paperId);
        if (!paper) {
            throw new NotFoundException('Cannot find the paper. A question must be under paper.')
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
            throw new NotFoundException(`question num ${questionNum} at paper ${paperId} not found`);
        }

        return await this.questionRepository.remove(question);
    }
}
