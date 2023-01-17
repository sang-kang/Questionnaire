import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Paper } from 'src/papers/entities/paper.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'question ' })
export class Question {
    @PrimaryColumn()
    @Field((type) => ID)
    num: number;

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: number;

    @ManyToOne(() => Paper, (paper: Paper) => paper.questions, { eager: true })
    @Field((type) => Paper)
    paper: Paper

    @OneToMany(() => Option, (option: Option) => option.question)
    @Field((type) => [Option], { nullable: 'itemsAndList' })
    options: Option[]

    @Column()
    @Field((type) => String)
    content: string
}