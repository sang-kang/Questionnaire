import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, Max, Min } from 'class-validator';

@InputType()
export class CreateTestChoiceInput {
  @Field(type => Int)
  userId: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => Int)
  @Min(1)
  @Max(100)
  questionNum: number;

  @Field(type => Int)
  @Min(1)
  @Max(10)
  optionNum: number;
}