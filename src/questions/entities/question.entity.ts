import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Paper } from 'src/papers/entities/paper.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'question ' })
export class Question {
    @PrimaryColumn()
    @Field((type) => ID)
    num: number;

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: number;

    @ManyToOne(() => Paper, (paper: Paper) => paper.questions)
    @JoinColumn()
    @Field((type) => Paper)
    paper: Paper

    @OneToMany(() => Option, (option: Option) => option.question)
    @Field(() => [Option])
    options: Option[]

    @Column()
    @Field()
    content: string
}