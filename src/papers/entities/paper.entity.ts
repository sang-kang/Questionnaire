import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Question } from 'src/questions/entities/question.entity';
import { TestChoice } from 'src/test-choices/entities/test-choice.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'paper ' })
export class Paper {
    @PrimaryColumn({ name: 'id' })  // FIXME: PrimaryGeneratedColumn
    @Field((type) => ID)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @OneToMany(() => TestResult, (testResult) => testResult.paper)
    @Field(() => [TestResult])
    testResults: TestResult[]
    
    @OneToMany(() => Question, (question) => question.paper)
    @Field(() => [Question])
    questions: Question[]

    // @OneToMany(() => Option, (option) => option.paper)
    // @Field(() => [Option])
    // options: Option[]

}