import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(type => String)
  @IsString()
  questionNum: string;

  @Field(type => String)
  @IsString()
  paperId: string;

  @Field(type => String)
  @IsString()
  content: string
}