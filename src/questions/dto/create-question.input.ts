import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(type => Int)
  @Min(1)
  @Max(100)
  questionNum: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => String)
  @IsString()
  content: string
}