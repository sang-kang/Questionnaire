import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CreateTestResultInput } from './create-test-result.input';

@InputType()
export class UpdateTestResultInput extends PartialType(CreateTestResultInput) {
    @Field(type => Int)
    totalScore: number;

    @Field()
    isSubmitted: boolean;
}