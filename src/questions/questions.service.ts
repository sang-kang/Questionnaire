import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
        const question = await this.questionRepository.create(createQuestionInput);
        const paper = await this.paperService.findOneBy(createQuestionInput.paperId);

        if (!paper) {
            throw new NotFoundException('Cannot find the paper. A question must be under paper.')
        }

        question.paper = paper;
        return await this.questionRepository.save(question);
    }

    async findAll(): Promise<Array<Question>> {
        return await this.questionRepository.find();
    }

    async findOneBy(id: string, paperId: string): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            id: id,
            paperId: paperId
        });

        if (!question) {
            throw new NotFoundException(`question num ${id} at paper ${paperId} not found`);
        }

        return question;
    }

    async update(id: string, paperId: string, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            id: id,
            paperId: paperId
        });

        if (!question) {
            throw new NotFoundException(`question num ${id} at paper ${paperId} not found`);
        }

        Object.assign(question, updateQuestionInput);
        return await this.questionRepository.save(question);
    }

    async remove(id: string, paperId: string): Promise<Question> {
        const question = await this.questionRepository.findOneBy({
            id: id,
            paperId: paperId
        });

        if (!question) {
            throw new NotFoundException(`question num ${id} at paper ${paperId} not found`);
        }

        return await this.questionRepository.remove(question);
    }
}
