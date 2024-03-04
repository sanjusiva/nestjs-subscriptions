import { Resolver, Mutation, Subscription, Directive } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

const PONG_EVENT_NAME = 'pong';

@Resolver('Ping')
export class PingPongResolvers {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation('ping')
  async ping() {
    const pingId = Date.now();
    this.pubSub.publish(PONG_EVENT_NAME, { [PONG_EVENT_NAME]: { pingId } });
    return { id: pingId };
  }

  @Subscription(PONG_EVENT_NAME)
  pong() {
    return this.pubSub.asyncIterator(PONG_EVENT_NAME);
  }
}


/*
ping - send
pong - receive

1st port : 3000  -> npm run start
2nd port : 3001  -> PORT=3001 npm start
*/