import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SuitchStateService } from 'src/services/state.service';

@Controller('api')
export class SuitchApiController {
	constructor(private readonly stateService: SuitchStateService) {}

	@Get('state')
	public getState() {
		const state = this.stateService.get();
		return state;
	}

	@Patch('state')
	public updateState(@Body() body: any) {
		const updatedState = this.stateService.update(body);

		return updatedState;
	}
}
