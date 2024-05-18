import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { SuitchApiController } from './controllers/api.controller';
import { SuitchEventGateway } from './gateways/event.gateway';
import { SuitchStateService } from './services/state.service';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
	],
	controllers: [SuitchApiController],
	providers: [SuitchStateService, SuitchEventGateway],
})
export class App {}
