import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateTestChoiceInput {
  @Field(type => Int)
  userId: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => Int)
  questionNum: number;

  @Field(type => Int)
  optionNum: number;
}