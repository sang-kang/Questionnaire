import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'paper ' })
export class Paper {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: number;

    @Column()
    @Field((type) => String)
    name: string;

    // paper는 있는데 testResults없을 수 있음. 
    @OneToMany(() => TestResult, (testResult) => testResult.paper)
    @Field((type) => [TestResult], { nullable: 'itemsAndList' })
    testResults: TestResult[]

    // paper는 있는데 questions없을 수 있음 
    @OneToMany(() => Question, (question) => question.paper)
    @Field((type) => [Question], { nullable: 'itemsAndList' })
    questions: Question[]
}