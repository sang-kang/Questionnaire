import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Paper } from 'src/papers/entities/paper.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'question ' })
export class Question {
    @PrimaryColumn({ name: 'id' })
    @Field((type) => ID)
    id: string;

    @PrimaryColumn({ name: 'paper_id' })
    @Field((type) => ID)
    paperId: string;

    @ManyToOne(() => Paper, (paper: Paper) => paper.questions)
    @JoinColumn({ 
        name: 'paper_id', 
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'FK_paper_question' 
    })
    @Field((type) => Paper)
    paper: Paper

    @OneToMany(() => Option, (option: Option) => option.question)
    @Field(() => [Option])
    options: Option[]

    @Column()
    @Field()
    content: string
}