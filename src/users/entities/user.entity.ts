import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TestChoice } from 'src/test-choices/entities/test-choice.entity';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'user ' })
export class User {
  @PrimaryColumn({ name: 'id' })  // FIXME: PrimaryGeneratedColumn 
  @Field((type) => ID)
  id: string;

  @Column()
  @Field()
  email: string;

  @OneToMany(() => TestResult, (testResult) => testResult.user)
  @Field(() => [TestResult])
  testResults: TestResult[]
}