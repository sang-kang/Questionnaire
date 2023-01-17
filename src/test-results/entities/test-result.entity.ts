import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { TestChoice } from 'src/test-choices/entities/test-choice.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'test_result ' })
export class TestResult {
    @PrimaryColumn()
    @Field((type) => ID)
    userId: number;

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: number;

    @ManyToOne(() => User, (user: User) => user.testResults, { eager: true })
    @Field((type) => User, { nullable: true })
    user: User

    @ManyToOne(() => Paper, (paper: Paper) => paper.testResults, { eager: true })
    @Field((type) => Paper, { nullable: true })
    paper: Paper

    @OneToMany(() => TestChoice, (testChoice: TestChoice) => testChoice.testResult)
    @Field((type) => [TestChoice], { nullable: 'itemsAndList' })
    testChoices: TestChoice[]

    @Column()
    @Field((type) => Int)
    totalScore: number

    @Column()
    @Field()
    isSubmitted: boolean
}