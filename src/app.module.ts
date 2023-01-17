import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case-directive';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { PapersModule } from './papers/papers.module';
import { TestResultsModule } from './test-results/test-results.module';
import { TestChoicesModule } from './test-choices/test-choices.module';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
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
      synchronize: true,
      logging: true
    }),
    UsersModule,
    PapersModule,
    TestResultsModule,
    TestChoicesModule,
    QuestionsModule,
    OptionsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    Logger
  ]
})
export class AppModule { }