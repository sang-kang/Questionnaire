import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsBoolean } from 'class-validator';

@InputType()
export class UpdateTestResultInput {
    @Field(type => Int)
    @IsInt()
    totalScore?: number;

    @Field()
    @IsBoolean()
    isSubmitted?: boolean;
}