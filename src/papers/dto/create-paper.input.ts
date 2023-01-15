import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePaperInput {
    @Field(type => String)
    @IsString()
    name: string;
}