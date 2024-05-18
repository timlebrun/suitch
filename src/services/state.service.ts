import { Injectable } from '@nestjs/common';
import * as EventEmitter from 'events';

@Injectable()
export class SuitchStateService extends EventEmitter {
	private readonly state: Record<string, string> = {};

	public update(update: Record<string, string>) {
		Object.assign(this.state, update);
		this.emit('change', update);

		return this.state;
	}

	public get() {
		return this.state;
	}
}
