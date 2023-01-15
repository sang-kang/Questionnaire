import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { Repository } from 'typeorm';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { Option } from './entities/option.entity';


@Injectable()
export class OptionsService {

    constructor(
        @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
        @Inject(QuestionsService) private readonly questionService: QuestionsService
    ) { }

    async create(createOptionInput: CreateOptionInput): Promise<Option> {
        const option = await this.optionRepository.create(createOptionInput);
        const question = await this.questionService.findOneBy(createOptionInput.questionNum, createOptionInput.paperId);

        if (!question) {
            throw new NotFoundException('Cannot find the question. An option must be under question.')
        }

        option.question = question;
        // option.paper = question.paper;  //FIXME: 이 부분 필요한가?
        return await this.optionRepository.save(option);
    }

    async findAll(): Promise<Array<Option>> {
        return await this.optionRepository.find();
    }

    async findOneBy(id: string, paperId: string, questionId: string): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            id:id,
            questionId: questionId,
            paperId: paperId
        });

        if (!option) {
            throw new NotFoundException(`option num ${id} in question ${questionId} in paper ${paperId} not found`);
        }

        return option;
    }

    async update(id: string, paperId: string, questionId: string, updateOptionInput: UpdateOptionInput): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            id:id,
            questionId: questionId,
            paperId: paperId
        });

        if (!option) {
            throw new NotFoundException(`option num ${id} in question ${questionId} in paper ${paperId} not found`);
        }

        Object.assign(option, updateOptionInput);
        return await this.optionRepository.save(option);
    }

    async remove(id: string, paperId: string, questionId: string): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            id:id,
            questionId: questionId,
            paperId: paperId
        });

        if (!option) {
            throw new NotFoundException(`option num ${id} in question ${questionId} in paper ${paperId} not found`);
        }
        
        return await this.optionRepository.remove(option);
    }
}
