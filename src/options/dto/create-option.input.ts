import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field(type => Int)
  optionNum: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => Int)
  questionNum: number;

  @Field(type => Int)
  score: number

  @Field(type => String)
  @IsString()
  content: string;
}