import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTestResultInput {
    @Field(type => Int)
    totalScore: number;

    @Field()
    isSubmitted: boolean
}