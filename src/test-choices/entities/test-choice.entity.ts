import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'test_choice ' })
export class TestChoice {
    @PrimaryColumn()
    @Field((type) => ID)
    userId: string

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: string;

    // @PrimaryColumn()
    // @Field((type) => ID)
    // questionId: string;

    // @PrimaryColumn()
    // @Field((type) => ID)
    // choiceId: string;

    @ManyToOne(() => User, (user: User) => user.testChoices)
    @JoinColumn({ name: "user_id" })    @Field((type) => User)
    user: User

    @ManyToOne(() => Paper, (paper: Paper) => paper.testChoices)
    @JoinColumn({ name: "paper_id" })
    @Field((type) => Paper)
    paper: Paper


    // @ManyToOne(() => Choice, (choice: Choice) => choice.testChoice)
    // @JoinColumn({ name: "user_id" })
    // @Field((type) => User)
    // choice: Choice


    @Column()
    @Field(() => Int)
    score: number
}