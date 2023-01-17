import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field(type => Int)
  @Min(1)
  @Max(10)
  optionNum: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => Int)
  @Min(1)
  @Max(100)
  questionNum: number;

  @Field(type => Int)
  score: number

  @Field(type => String)
  @IsString()
  content: string;
}