import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { User } from 'src/users/entities/user.entity';
import { Option } from 'src/options/entities/option.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

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

    @PrimaryColumn()
    @Field((type) => ID)
    optionQuestionPaperId: number

    @PrimaryColumn()
    @Field((type) => ID)
    optionQuestionNum: number;

    @ManyToOne(() => TestResult, (testResult: TestResult) => testResult.testChoices, { eager: true })
    @Field((type) => TestResult)
    testResult: TestResult

    @OneToOne(() => Option, (option: Option) => option.testChoice)
    @JoinColumn()
    @Field((type) => User, { nullable: true }) // 0 or 1 : 1이니까?
    option: Option

    @Column()
    @Field((type) => Int)
    score: number
}