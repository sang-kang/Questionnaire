import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
    @Field(type => String)
    @IsString()
    content: string
}