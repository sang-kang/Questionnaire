import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Max, Min, IsInt } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(type => Int)
  @IsInt()
  @Min(1)
  @Max(100)
  questionNum: number;

  @Field(type => Int)
  @IsInt()
  paperId: number;

  @Field(type => String)
  @IsString()
  content: string
}