import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TestResult } from 'src/test-results/entities/test-result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'user ' })
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  email: string;

  // user는 있는데 testResult는 없을 수 잇음. 
  @OneToMany(() => TestResult, (testResult) => testResult.user)
  @Field((type) => [TestResult], { nullable: 'itemsAndList' })
  testResults: TestResult[]
}