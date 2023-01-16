import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case-directive';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { PapersModule } from './papers/papers.module';
import { TestResultsModule } from './test-results/test-results.module';
import { TestChoicesModule } from './test-choices/test-choices.module';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'postgres',
      autoLoadEntities: true,
      // entities: [Paper],
      synchronize: true,
      // dropSchema: true,
      logging: true
    }),
    RecipesModule,
    UsersModule,
    PapersModule,
    TestResultsModule,
    TestChoicesModule,
    QuestionsModule,
    OptionsModule,
  ],
})
export class AppModule { }