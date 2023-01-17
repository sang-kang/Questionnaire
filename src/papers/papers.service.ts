import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaperInput } from './dto/create-paper.input';
import { UpdatePaperInput } from './dto/update-paper.input';
import { Paper } from './entities/paper.entity';


@Injectable()
export class PapersService {

    constructor(@InjectRepository(Paper) private paperRepository: Repository<Paper>) { }

    async create({ name }: CreatePaperInput): Promise<Paper> {
        const nameExist = await this.paperRepository.findOneBy({ name: name })
        if (nameExist) {
            throw new BadRequestException(`name ${name} already exist. choose others.`)
        }

        const paper = this.paperRepository.create({ name: name });
        return await this.paperRepository.save(paper);
    }

    async findAll(): Promise<Array<Paper>> {
        return await this.paperRepository.createQueryBuilder('paper')
            .leftJoinAndSelect('paper.testResults', 'testResults')
            .leftJoinAndSelect('paper.questions', 'questions')
            .getMany();
    }

    async findOneBy(id: number): Promise<Paper> {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`);
        }

        return await this.paperRepository.createQueryBuilder('paper')
            .leftJoinAndSelect('paper.testResults', 'testResults')
            .leftJoinAndSelect('paper.questions', 'questions')
            .where('paper.id = :paperId', { paperId: id })
            .getOne();
    }

    async update(id: number, updatePaperInput: UpdatePaperInput): Promise<Paper> {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`)
        }

        const nameExist = await this.paperRepository.findOneBy({ name: updatePaperInput.name })
        if (nameExist && nameExist.id !== id) {
            throw new BadRequestException(`name ${updatePaperInput.name} already used by other. update to another one.`)
        }

        Object.assign(paper, updatePaperInput);
        return await this.paperRepository.save(paper);
    }

    async remove(id: number) {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`);
        }

        return await this.paperRepository.remove(paper);
    }
}
