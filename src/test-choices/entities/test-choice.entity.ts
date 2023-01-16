import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { User } from 'src/users/entities/user.entity';
import { Option } from 'src/options/entities/option.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'test_choice ' })
export class TestChoice {
    @PrimaryColumn()
    @Field((type) => ID)
    testResultUserId: number

    @PrimaryColumn()
    @Field((type) => ID)
    testResultPaperId: number;

    @PrimaryColumn()
    @Field((type) => ID)
    optionNum: number;

    // @PrimaryColumn()
    // @Field((type) => ID)
    // optionPaperId: number;
    @PrimaryColumn()
    @Field((type) => ID)
    optionQuestionPaperId: number

    @PrimaryColumn()
    @Field((type) => ID)
    optionQuestionNum: number;

    @ManyToOne(() => TestResult, (testResult: TestResult) => testResult.testChoices)
    @JoinColumn()
    @Field((type) => TestResult)
    testResult: TestResult

    @OneToOne(() => Option, (option: Option) => option.testChoice)
    @JoinColumn()
    @Field((type) => User)
    option: Option

    @Column()
    @Field(() => Int)
    score: number
}