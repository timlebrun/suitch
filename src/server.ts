import { NestFactory } from '@nestjs/core';
import { App } from './app';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
	const app = await NestFactory.create(App);
	app.useWebSocketAdapter(new IoAdapter(app));

	app.enableCors();

	await app.listen(3000);
}
bootstrap();
