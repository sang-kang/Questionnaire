import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export class CreateTestChoiceInput {

  @Field(type => Int)
  @IsInt()
  userId: number;

  @Field(type => Int)
  @IsInt()
  paperId: number;

  @Field(type => Int)
  @IsInt()
  @Min(1)
  @Max(100)
  questionNum: number;

  @Field(type => Int)
  @IsInt()
  @Min(1)
  @Max(10)
  optionNum: number;
}