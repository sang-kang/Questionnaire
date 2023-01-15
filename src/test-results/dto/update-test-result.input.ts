import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CreateTestResultInput } from './create-test-result.input';

@InputType()
export class UpdateTestResultInput extends PartialType(CreateTestResultInput) {
    
}