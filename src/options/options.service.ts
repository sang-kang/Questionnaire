import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyLogger } from 'src/logger/my-loger.service';
import { QuestionsService } from 'src/questions/questions.service';
import { Repository } from 'typeorm';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { Option } from './entities/option.entity';


@Injectable()
export class OptionsService {

    constructor(
        private readonly myLogger: MyLogger,
        @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
        @Inject(QuestionsService) private readonly questionService: QuestionsService
    ) {
        this.myLogger.setContext('OptionsService');
    }

    async create({ optionNum, paperId, questionNum, score, content }: CreateOptionInput): Promise<Option> {
        const optionExist = await this.optionRepository.findOneBy({
            num: optionNum,
            questionNum: questionNum,
            questionPaperId: paperId
        });

        if (optionExist) {
            this.myLogger.error(`option num ${optionNum} in question num ${questionNum} in paper id ${paperId} already exist`);
            throw new BadRequestException(`option num ${optionNum} in question num ${questionNum} in paper id ${paperId} already exist`);
        }

        const option = await this.optionRepository.create({
            num: optionNum,
            score: score,
            content: content
        });
        const question = await this.questionService.findOneBy(questionNum, paperId);

        if (!question) {
            this.myLogger.error(`Cannot find the question ${questionNum}.`);
            throw new NotFoundException(`Cannot find the question ${questionNum}.`);
        }

        option.question = question;
        return await this.optionRepository.save(option);
    }

    async findAll(): Promise<Array<Option>> {
        return await this.optionRepository.createQueryBuilder('option')
            .leftJoinAndSelect('option.question', 'question')
            .leftJoinAndSelect('option.testChoice', 'testChoice')
            .getMany();
    }

    async findOneBy(optionNum: number, questionNum: number, paperId: number): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            num: optionNum,
            questionNum: questionNum,
            questionPaperId: paperId
        });

        if (!option) {
            this.myLogger.error(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
            throw new NotFoundException(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
        }

        return await this.optionRepository.createQueryBuilder('option')
            .leftJoinAndSelect('option.question', 'question')
            .leftJoinAndSelect('option.testChoice', 'testChoice')
            .where('option.num = :optionNum', { optionNum: optionNum })
            .andWhere('question.num = :questionNum', { questionNum: questionNum })
            .andWhere('question.paperId = :questionPaperId', { questionPaperId: paperId })
            .getOne();
    }

    async update(optionNum: number, questionNum: number, paperId: number, updateOptionInput: Partial<UpdateOptionInput>): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            num: optionNum,
            questionNum: questionNum,
            questionPaperId: paperId
        });

        if (!option) {
            this.myLogger.error(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
            throw new NotFoundException(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
        }

        Object.assign(option, updateOptionInput);
        return await this.optionRepository.save(option);
    }

    async remove(optionNum: number, questionNum: number, paperId: number): Promise<Option> {
        const option = await this.optionRepository.findOneBy({
            num: optionNum,
            questionNum: questionNum,
            questionPaperId: paperId
        });

        if (!option) {
            this.myLogger.error(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
            throw new NotFoundException(`option num ${optionNum} in question ${questionNum} in paper ${paperId} not found`);
        }

        return await this.optionRepository.remove(option);
    }
}
