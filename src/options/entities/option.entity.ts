import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { TestChoice } from 'src/test-choices/entities/test-choice.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'option ' })
export class Option {
    @PrimaryColumn()
    @Field((type) => ID)
    num: number;

    @PrimaryColumn()
    @Field((type) => ID)
    questionNum: number;

    @PrimaryColumn()
    @Field((type) => ID)
    questionPaperId: number;

    @ManyToOne(() => Question, (question: Question) => question.options, { eager: true })
    @Field((type) => Question)
    question: Question

    // option은 있는데 testChoice는 없을 수 있음. 
    @OneToOne(() => TestChoice, (testChoice) => testChoice.option)
    @Field((type) => TestChoice, { nullable: true })
    testChoice: TestChoice

    @Column()
    @Field((type) => Int)
    score: number

    @Column()
    @Field()
    content: string
}