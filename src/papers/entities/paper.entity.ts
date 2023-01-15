import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'paper ' })
export class Paper {
    @PrimaryGeneratedColumn()
    @Field((type) => ID)
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @OneToMany(() => TestResult, (testResult) => testResult.paper)
    @Field(()=> [TestResult])
    testResults: TestResult[]
}