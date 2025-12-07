import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap function
 * Entry point of the application
 */
async function bootstrap() {
  // Create Nest application instance
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Start server on port 3000
  await app.listen(3000);
  console.log(`API running on http://localhost:3000`);
}

bootstrap();
