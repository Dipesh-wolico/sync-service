// import { Controller, Get, Route, Tags } from 'tsoa';
import { SynchronizationService } from './database-synchronization.service';
import { Controller, Get, Route, Tags, SuccessResponse } from 'tsoa';

@Route('syncronization')
@Tags('player-synchronization')
export class SynchronizationController extends Controller {
	private syncService: SynchronizationService;

	constructor() {
		super();
		this.syncService = new SynchronizationService();
	}

	@Get('/')
	@SuccessResponse('200', 'Success')
	public async getTesseratiSocieta() {
		try {
			// const result = await SynchronizationService.syncPlayerData();
			// console.log('result:', result);
			// return result;
		} catch (e) {
			console.error('Error in controller:', e);
			throw new Error('Failed to retrieve data');
		}
	}

	@Get('syncPlayerData')
	@SuccessResponse('200', 'Success')
	public async syncPlayerData() {
		try {
			const result = await this.syncService.saveMemberFIGC();
			console.log('result:', result);
			return result;
		} catch (e) {
			console.error('Error in controller:', e);
			throw new Error('Failed to retrieve data');
		}
	}
}
