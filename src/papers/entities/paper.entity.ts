import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'paper ' })
export class Paper {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: string;

    @Column()
    @Field(() => String)
    name: string;
}