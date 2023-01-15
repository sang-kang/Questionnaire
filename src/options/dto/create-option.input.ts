import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field(type => String)
  @IsString()
  optionNum: string;

  @Field(type => String)
  @IsString()
  paperId: string;

  @Field(type => String)
  @IsString()
  questionNum: string;

  @Field(type => Int)
  @IsString()
  score: number

  @Field(type => String)
  @IsString()
  content: string;
}