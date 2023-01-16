import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

// Query parameter
@ArgsType()
export class NameArgs {
    @Field(type => ID)
    id: number
}