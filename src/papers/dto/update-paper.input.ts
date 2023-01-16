import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CreatePaperInput } from './create-paper.input';

@InputType()
export class UpdatePaperInput extends PartialType(CreatePaperInput) { }