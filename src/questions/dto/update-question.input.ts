import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) { }