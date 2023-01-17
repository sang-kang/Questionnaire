import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';


@InputType()
export class UpdateTestChoiceInput {
    @IsInt()
    @Field(type => Int)
    optionNum: number;
}