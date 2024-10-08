import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    const configService = app.get(ConfigService);
    const port = configService.get('port');
    const isDev = configService.get('env') === 'development';

    if (isDev) {
        app.enableCors({
            origin: 'http://localhost:5173',
            credentials: true,
            exposedHeaders: ['set-cookie'],
        });

        const config = new DocumentBuilder()
            .setTitle('Crowd Cue API')
            .setDescription('The Crowd Cue API description')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }));

    await app.listen(port);
}
bootstrap();
