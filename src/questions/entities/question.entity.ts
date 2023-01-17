import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Option } from 'src/options/entities/option.entity';
import { Paper } from 'src/papers/entities/paper.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'question ' })
export class Question {
    @PrimaryColumn()
    @Field((type) => ID)
    num: number;

    @PrimaryColumn()
    @Field((type) => ID)
    paperId: number;
    
    // question은 있는데 paper는 없을 수 없음. 아니지 없을 수 잇나? paper생성하고 삭제했따면?
    @ManyToOne(() => Paper, (paper: Paper) => paper.questions, { eager: true })
    @Field((type) => Paper)
    paper: Paper

    @OneToMany(() => Option, (option: Option) => option.question)
    @Field((type) => [Option], { nullable: 'itemsAndList' })
    options: Option[]

    @Column()
    @Field((type) => String)
    content: string
}