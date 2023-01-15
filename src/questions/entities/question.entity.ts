import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Paper } from 'src/papers/entities/paper.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'question ' })
export class Question {
    @PrimaryColumn()
    @Field((type) => ID)
    questionNum: string;

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: string;

    @ManyToOne(() => Paper, (paper: Paper) => paper.questions)
    @Field((type) => Paper)
    paper: Paper

    @Column()
    @Field()
    content: string
}