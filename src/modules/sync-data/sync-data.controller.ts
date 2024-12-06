// import { Controller, Get, Route, Tags } from 'tsoa';
import { SoapService } from './sync-data.service';
import {
	Controller,
	Get,
	Route,
	// Query,
	Tags,
	Post,
	SuccessResponse,
} from 'tsoa';

@Route('examples')
@Tags('Example')
export class ExampleController extends Controller {
	@Get('/')
	public async getExample(): Promise<{ message: string }> {
		console.log('getExample');

		return { message: 'Hello, TSOA!' };
	}

	// @Get('tesserati-societa')
	// public async getTesseratiSocieta(
	// 	@Query() serialNumber?: string
	// ): Promise<any> {
	// 	try {
	// 		console.log('serialNumber:', serialNumber);

	// 		const data = await SoapService.getTesseratiSocieta(
	// 			serialNumber || '81706'
	// 		);
	// 		return data;
	// 	} catch (error) {
	// 		this.setStatus(500);
	// 		return { error: (error as any).message };
	// 	}
	// }

	@Post('getTesseratiSocieta')
	@SuccessResponse('200', 'Success')
	public async getTesseratiSocieta() {
		// @Query('serialNumber') serialNumber: string = '81706'
		try {
			const result = await SoapService.getTesseratiSocieta();
			console.log('result:', result);

			return result;
		} catch (e) {
			console.error('Error in controller:', e);
			throw new Error('Failed to retrieve data');
		}
	}
}
