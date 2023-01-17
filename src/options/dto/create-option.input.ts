import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Max, Min, IsInt } from 'class-validator';

@InputType()
export class CreateOptionInput {
  
  @Field(type => Int)
  @IsInt()
  @Min(1)
  @Max(10)
  optionNum: number;

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
  score: number

  @Field(type => String)
  @IsString()
  content: string;
}