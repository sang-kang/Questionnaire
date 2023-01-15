import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateTestChoiceInput {
  @Field(type => String)
  @IsEmail()
  email: string;
}