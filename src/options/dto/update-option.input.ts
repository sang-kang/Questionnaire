import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreateOptionInput } from './create-option.input';

@InputType()
export class UpdateOptionInput {
    @Field(type => Int)
    score?: number

    @Field(type => String)
    @IsString()
    content?: string;
}