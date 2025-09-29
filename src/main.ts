import { NestFactory } from '@nestjs/core';
import { ParisModule } from './paris.module';

async function bootstrap() {
  const app = await NestFactory.create(ParisModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();