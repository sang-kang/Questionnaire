import { InputType, Field, ID } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
@InputType()
export class CreateTestResultInput {
    @Field(type => ID)
    @IsInt()
    userId: number;

    @Field(type => ID)
    @IsInt()
    paperId: number;
}