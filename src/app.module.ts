import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PingPongResolvers } from './ping-pong.resolvers';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    })
  ],
  controllers: [],
  providers: [
    PingPongResolvers,
    {
      provide: 'PUB_SUB',
      useFactory:()=>{
        const options={
          host:'localhost',
          port:6379
        };
        return new RedisPubSub({
          publisher:new Redis(options),
          subscriber:new Redis(options)
        });
      }
    },
  ],
})
export class AppModule {}
