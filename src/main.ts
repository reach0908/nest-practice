import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

import { AuthIoAdapter } from './chat/adapters/auth.adapter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(cookieParser())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    )

    app.useWebSocketAdapter(new AuthIoAdapter(app))

    const options = new DocumentBuilder()
        .setTitle('Realtime chat')
        .setDescription('The realtime chat API description')
        .setVersion('1.0')
        .addTag('chat')
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
