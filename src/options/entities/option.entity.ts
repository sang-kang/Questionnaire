import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { Question } from 'src/questions/entities/question.entity';
import { TestChoice } from 'src/test-choices/entities/test-choice.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

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

    // // 이거 꼭 넣어야 하나 의문.. 그런데 이름 예쁘게 하려면 넣어야 되고 
    // @ManyToOne(() => Paper, (paper: Paper) => paper.options)
    // @JoinColumn({ name: "paper_id" })
    // @Field((type) => Paper)
    // paper: Paper

    @ManyToOne(() => Question, (question: Question) => question.options)
    @JoinColumn()
    @Field((type) => Question)
    question: Question
    // Question테이블은 Composite primary key(id, paper_id))를 가지고 있기 때문에, question에 대헌 어떤 references든 반드시 이 두 칼럼을 포함해야 한다. 

    @OneToOne(() => TestChoice, (testChoice) => testChoice.option)
    @Field(() => TestChoice)
    testChoice: TestChoice

    @Column()
    @Field((type) => Int)
    score: number

    @Column()
    @Field()
    content: string
}