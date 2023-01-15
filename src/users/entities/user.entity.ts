import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'user ' })
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;
  
  @Column()
  @Field()
  email: string;

  @OneToMany(() => TestResult, (testResult) => testResult.user)
  @Field(() => [TestResult])
  testResults: TestResult[]
}