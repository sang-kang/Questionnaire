import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CreateTestChoiceInput } from './create-test-choice.input';

@InputType()
export class UpdateTestChoiceInput extends PartialType(CreateTestChoiceInput) { }