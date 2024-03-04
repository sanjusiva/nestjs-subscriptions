import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();


//https://dev.to/thisdotmedia/graphql-subscriptions-with-nest-how-to-publish-across-multiple-running-servers-15e