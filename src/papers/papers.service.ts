import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaperInput } from './dto/create-paper.input';
import { UpdatePaperInput } from './dto/update-paper.input';
import { Paper } from './entities/paper.entity';


@Injectable()
export class PapersService {

    constructor(
        @InjectRepository(Paper) private paperRepository: Repository<Paper>
    ) { }

    async create(createPaperInput: CreatePaperInput): Promise<Paper> {
        const paper = this.paperRepository.create(createPaperInput);
        return await this.paperRepository.save(paper);
    }

    async findAll(): Promise<Array<Paper>> {
        return await this.paperRepository.find();
    }

    async findOneBy(id: string): Promise<Paper> {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`);
        }

        return paper;
    }

    async update(id: string, updatePaperInput: UpdatePaperInput): Promise<Paper> {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`)
        }

        Object.assign(paper, updatePaperInput);
        return await this.paperRepository.save(paper);
    }

    async remove(id: string) {
        const paper = await this.paperRepository.findOneBy({ id: id });

        if (!paper) {
            throw new NotFoundException(`Paper #${id} not found`);
        }

        return await this.paperRepository.remove(paper);
    }
}
