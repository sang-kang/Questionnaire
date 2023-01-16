import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateTestResultInput {
    @Field(type => ID)
    userId: number;

    @Field(type => ID)
    paperId: number;
}