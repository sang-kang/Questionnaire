import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'test_result ' })
export class TestResult {
    @PrimaryColumn({ name: 'user_id' })
    @Field((type) => ID)
    userId: string;

    @PrimaryColumn({ name: 'paper_id' })
    @Field((type) => ID)
    paperId: string;

    @ManyToOne(() => User, (user: User) => user.testResults)
    @JoinColumn({ name: "user_id" })
    @Field((type) => User)
    user: User

    @ManyToOne(() => Paper, (paper: Paper) => paper.testResults)
    @JoinColumn({ name: "paper_id" })
    @Field((type) => Paper)
    paper: Paper

    @Column()
    @Field((type) => Int)
    totalScore: number

    @Column()
    @Field()
    isSubmitted: boolean
}