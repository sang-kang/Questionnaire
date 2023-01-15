import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { User } from 'src/users/entities/user.entity';
import { Option } from 'src/options/entities/option.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'test_choice ' })
export class TestChoice {
    @PrimaryColumn({ name: "user_id" })
    @Field((type) => ID)
    userId: string

    @PrimaryColumn({ name: "paper_id" })
    @Field((type) => ID)
    paperId: string;

    @PrimaryColumn({ name: "question_id" })
    @Field((type) => ID)
    questionId: string;

    @PrimaryColumn({ name: "option_id" })
    @Field((type) => ID)
    optionId: string;

    @ManyToOne(() => User, (user: User) => user.testChoices)
    @JoinColumn({ name: "user_id" })
    @Field((type) => User)
    user: User

    @ManyToOne(() => Paper, (paper: Paper) => paper.testChoices)
    @JoinColumn({ name: "paper_id" })
    @Field((type) => Paper)
    paper: Paper


    // @OneToOne(() => Option, (option: Option) => option.testChoice)
    // @JoinColumn({ name: "user_id" })
    // @Field((type) => User)
    // option: Option


    @Column()
    @Field(() => Int)
    score: number
}