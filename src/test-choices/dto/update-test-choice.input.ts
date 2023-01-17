import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateTestChoiceInput } from './create-test-choice.input';

@InputType()
export class UpdateTestChoiceInput {
    @Field(type => Int)
    optionNum: number;
}