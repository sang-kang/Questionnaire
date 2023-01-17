import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async create({ email }: CreateUserInput): Promise<User> {
        const emailExist = await this.userRepository.findOneBy({ email: email })
        if (emailExist) {
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
            throw new NotFoundException(`User #${id} not found`)
        }

        const emailExist = await this.userRepository.findOneBy({
            email: updateUserInput.email
        })
        // email같더라도 기존에 자신이 사용하던 거면 그대로 써도 되니까. 
        if (emailExist && emailExist.id !== id) {
            throw new BadRequestException(`email ${updateUserInput.email} already used by other. update to another one`)
        }

        Object.assign(user, updateUserInput);
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return await this.userRepository.remove(user);
    }
}