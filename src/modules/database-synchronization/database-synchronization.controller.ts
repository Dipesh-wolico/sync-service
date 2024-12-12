// import { SynchronizationService } from './database-synchronization.service';
// import { Controller, Get, Route, Tags, SuccessResponse } from 'tsoa';

// @Route('syncronization')
// @Tags('player-synchronization')
// export class SynchronizationController extends Controller {
// 	private syncService: SynchronizationService;

// 	constructor() {
// 		super();
// 		this.syncService = new SynchronizationService();
// 	}

// 	@Get('syncPlayerData')
// 	@SuccessResponse('200', 'Success')
// 	public async syncPlayerData() {
// 		try {
// 			const result = await this.syncService.saveMemberFIGC();
// 			return result;
// 		} catch (e) {
// 			console.error('Error in controller:', e);
// 			throw new Error('Failed to retrieve data');
// 		}
// 	}
// }
