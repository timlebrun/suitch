import { Logger } from '@nestjs/common';
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { SuitchStateService } from 'src/services/state.service';

@WebSocketGateway({ namespace: 'events', path: '/websocket' })
export class SuitchEventGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	private readonly logger = new Logger(this.constructor.name);

	private server: Server;

	constructor(private readonly stateService: SuitchStateService) {
		this.stateService.on('change', (event) => this.handleSuitchEvent(event));

		setInterval(() => this.heartBeat(), 1000);
	}

	private heartBeat() {
		const state = this.stateService.get();
		this.server.local.emit('suitch::state:heartbeat', state);
	}

	private handleSuitchEvent(event) {
		this.logger.verbose('Broadcasting state change to clients');
		this.server.local.emit('suitch::state:changed', event);
	}

	afterInit(server: Server) {
		this.server = server;
		this.logger.debug('Gateway loaded !');
	}
	handleConnection(client: Socket) {
		this.logger.debug('Client connected !');

		const state = this.stateService.get();
		client.emit('suitch::state:hello', state);
	}

	handleDisconnect(client: Socket) {
		this.logger.debug('Client disconnected :(');
	}

	@SubscribeMessage('suitch::state.update')
	handleGoMessage(@MessageBody() messageUpdate: any) {
		this.logger.debug(`Received state update Event ${JSON.stringify(messageUpdate)}`);
		this.stateService.update(messageUpdate);
	}
}
