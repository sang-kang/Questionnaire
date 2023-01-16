import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(type => Int)
  questionNum: number;

  @Field(type => Int)
  paperId: number;

  @Field(type => String)
  @IsString()
  content: string
}