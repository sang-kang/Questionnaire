import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';
import { MyLogger } from 'src/logger/my-loger.service';

@Injectable()
export class UsersService {
    constructor(
        private myLogger: MyLogger,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
        this.myLogger.setContext("UsersService");
    }

    async create({ email }: CreateUserInput): Promise<User> {
        const emailExist = await this.userRepository.findOneBy({ email: email })
        if (emailExist) {
            this.myLogger.error(`email ${email} already exist. choose others.`);
            throw new BadRequestException(`email ${email} already exist. choose others.`)
        }

        const user = await this.userRepository.create({ email: email });
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<Array<User>> {
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.testResults', 'testResults')
            .getMany();
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            this.myLogger.error(`User #${id} not found`);
            throw new NotFoundException(`User #${id} not found`);
        }

        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.testResults', 'testResults')
            .where('user.id = :userId', { userId: id })
            .getOne();
    }

    async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            this.myLogger.error(`User #${id} not found`);
            throw new NotFoundException(`User #${id} not found`);
        }

        const emailExist = await this.userRepository.findOneBy({
            email: updateUserInput.email
        })

        if (emailExist && emailExist.id !== id) {
            this.myLogger.error(`email ${updateUserInput.email} already used by other. update to another one`);
            throw new BadRequestException(`email ${updateUserInput.email} already used by other. update to another one`);
        }

        Object.assign(user, updateUserInput);
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            this.myLogger.error(`User #${id} not found`);
            throw new NotFoundException(`User #${id} not found`);
        }

        return await this.userRepository.remove(user);
    }
}