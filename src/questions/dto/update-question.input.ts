import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput {
    @Field(type => String)
    @IsString()
    content: string
}