import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateOptionInput {
    @Field(type => Int)
    @IsInt()
    score?: number

    @Field(type => String)
    @IsString()
    content?: string;
}