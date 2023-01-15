import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async create(createUserInput: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(createUserInput);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<Array<User>> {
        return await this.userRepository.find();
    }

    async findOneById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return user;
    }

    async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
        // const user = await this.userRepository.preload({
        //     id: id,
        //     ...updateUserInput,
        // });

        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException(`User #${id} not found`)
        }

        Object.assign(user, updateUserInput);
        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return await this.userRepository.remove(user);
    }
}