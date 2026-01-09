import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Enable CORS natively with NestJS

  const config = new DocumentBuilder()
    .setTitle('MangoBank API')
    .setDescription('Banking application API for managing accounts, cards, and transactions')
    .setVersion('1.0')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Accounts', 'Account management endpoints')
    .addTag('Cards', 'Card management endpoints')
    .addTag('Transactions', 'Transaction endpoints')
    .addTag('Profiles', 'User profile endpoints')
    .addTag('Settings', 'Settings endpoints')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/MangoBank', app, document);
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();