// import { Repository } from 'typeorm';
// import { MemberFIGC } from '../db/models/MemberFIGC';
// import { Player } from '../db/models/Player';
// import { MemberLega } from '../db/models/MemberLega';
import { PGDataSource } from '../db';
import { Parser } from 'xml2js';

import { NtlmClient } from 'axios-ntlm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SeasonPeriod } from '../db/models/SeasonPeriod';
import { Season } from '../db/models/Season';
import { getSoapServiceData } from '../constants/constants';

export class SynchronizationService {
	// private playerRepo: Repository<Player>;
	// private memberFigcRepo: Repository<MemberFIGC>;
	// private memberLegaRepo: Repository<MemberLega>;
	public seasonRepo: Repository<Season>;
	public seasonPeriodRepo: Repository<SeasonPeriod>;

	constructor() {
		// this.playerRepo = PGDataSource.getRepository(Player);
		// this.memberFigcRepo = PGDataSource.getRepository(MemberFIGC);
		// this.memberLegaRepo = PGDataSource.getRepository(MemberLega);
		this.seasonPeriodRepo = PGDataSource.getRepository(SeasonPeriod);
		this.seasonRepo = PGDataSource.getRepository(Season);
	}

	/**
	 * Save or update a MemberFIGC record and maintain relationships.
	 * @param serialNumber - Serial number of the member.
	 * @param memberData - Data for the member to be saved or updated.
	 */
	// public async saveMemberFIGC(
	// 	serialNumber: string,
	// 	memberData: Partial<MemberFIGC>
	// ): Promise<MemberFIGC> {
	// 	const existingFigcMember = await this.memberFigcRepo.findOneBy({
	// 		serialNumber: Number(serialNumber),
	// 	});

	// 	if (existingFigcMember) {
	// 		// Update the existing FIGC member
	// 		this.memberFigcRepo.merge(existingFigcMember, memberData);
	// 		return await this.memberFigcRepo.save(existingFigcMember);
	// 	} else {
	// 		// No record in FIGC, check in Lega
	// 		const existingLegaMember =
	// 			await this.memberLegaRepo.findOneBy({
	// 				serialNumber: Number(serialNumber),
	// 			});

	// 		if (existingLegaMember) {
	// 			// Create a new FIGC member and relate it to the existing Lega member via Player
	// 			const newFigcMember = this.memberFigcRepo.create({
	// 				serialNumber,
	// 				...memberData,
	// 			});
	// 			const savedFigcMember = await this.memberFigcRepo.save(
	// 				newFigcMember
	// 			);

	// 			// Create a new Player relationship
	// 			const newPlayer = this.playerRepo.create({
	// 				memberFigc: savedFigcMember,
	// 				memberLega: existingLegaMember,
	// 			});
	// 			await this.playerRepo.save(newPlayer);

	// 			return savedFigcMember;
	// 		} else {
	// 			// No record in Lega, create a new FIGC member and a new Player relationship
	// 			const newFigcMember = this.memberFigcRepo.create({
	// 				serialNumber,
	// 				...memberData,
	// 			});
	// 			const savedFigcMember = await this.memberFigcRepo.save(
	// 				newFigcMember
	// 			);

	// 			const newPlayer = this.playerRepo.create({
	// 				memberFigc: savedFigcMember,
	// 			});
	// 			await this.playerRepo.save(newPlayer);

	// 			return savedFigcMember;
	// 		}
	// 	}
	// }

	/**
	 * Save or update a MemberFIGC record and maintain relationships.
	 * @param serialNumber - Serial number of the member.
	 * @param memberData - Datas for the member to be saved or updated.
	 */
	public async saveMemberFIGC() {
		// memberData: Partial<MemberFIGC> // serialNumber: string,
		const seasonPeriod = await this.seasonPeriodRepo.findOne({
			where: {
				startDate: LessThanOrEqual(new Date()),
				endDate: MoreThanOrEqual(new Date()),
			},
			select: {
				id: true,
			},
		});

		if (!seasonPeriod) {
			throw new Error('No active season period found');
		}

		const seasonTeams = await this.seasonRepo
			.createQueryBuilder('season')
			.innerJoinAndSelect(
				'season.teams',
				'team',
				'team.isActive = :isActive AND team.isDeleted = :isDeleted',
				{
					isActive: true,
					isDeleted: false,
				}
			)
			.where('season.seasonPeriodId = :seasonPeriodId', {
				seasonPeriodId: seasonPeriod.id,
			})
			.andWhere('season.isActive = :isActive', { isActive: true })
			.andWhere('season.isDeleted = :isDeleted', {
				isDeleted: false,
			})
			.select([
				'DISTINCT team.id AS id',
				'team.name AS name',
				'team.isActive AS isActive',
				'team.isDeleted AS isDeleted',
				'team.serialNumber AS serialNumber',
			])
			.getRawMany();

		let dataplayer;
		seasonTeams.map(async (team) => {
			console.log('team:', team);
			dataplayer = await this.getTesseratiSocieta(81706);
		});
		// const columnMapping: { [key: string]: string } = {
		// 	MATRICOLA: 'serial_number',
		// 	NOME: 'first_name',
		// 	COGNOME: 'last_name',
		// 	DATA_NASCITA: 'birth_date',
		// 	CODICE_SVINCOLO: 'free_transfer_code',
		// 	DESCRIZIONE_SVINCOLO: 'free_transfer',
		// 	DATA_SVINCOLO: 'free_transfer_date',
		// 	DATA_SCADENZA: 'contract_end_year',
		// 	CODICE_SOCIETA: 'teamid',
		// 	SOCIETA_PRESTITO: 'temporary_teamid',
		// 	CODICE_STATO: 'statusid',
		// 	DATA_TESSERAMENTO: 'membership_date',
		// 	DATA_PREST_OPZ: 'loan_option_date',
		// 	IDONEITA: 'idoneity',
		// };

		// Map and rename columns
		// const mappedData = dataplayer.map(
		// 	(item: { [s: string]: unknown } | ArrayLike<unknown>) => {
		// 		const mappedItem: { [key: string]: any } = {};
		// 		for (const [key, value] of Object.entries(item)) {
		// 			if (columnMapping[key as string]) {
		// 				mappedItem[columnMapping[key]] = value;
		// 			} else if (
		// 				typeof value === 'object' &&
		// 				!Array.isArray(value)
		// 			) {
		// 				// Keep nested objects as they are
		// 				mappedItem[key] = value;
		// 			}
		// 		}
		// 		return mappedItem;
		// 	}
		// );

		return {
			data: dataplayer,
		};
	}

	public async getTesseratiSocieta(serialNumber: number) {
		// const

		try {
			let credentials = {
				username: 'ws.lnp',
				password: 'L3g3Prof3ss!',
				domain: 'FIGC',
			};

			let client = NtlmClient(credentials);

			let resp = await client({
				url: 'http://192.168.220.13:8080/WS_Help/AS400_storedProcedures_WS.asmx',
				method: 'POST',
				headers: {
					'Content-Type': 'text/xml',
				},
				data: `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
           ${getSoapServiceData.teamPlayersData(serialNumber)}
        </soap12:Body>
        </soap12:Envelope>`,
			});
			console.log('dataO', resp.data);

			const xmlData = await this.parseXmlToJson(
				resp.data,
				'NewDataSet'
			);
			const table1Array = xmlData?.data?.Table1 || [];
			console.log('xmlData:', table1Array);
			return xmlData;
		} catch (error) {
			console.error('Error:', error);
			throw new Error('Failed to retrieve data');
		}
	}

	public async parseXmlToJson(
		xmlResponse: string,
		rootNode: string | null = null
	) {
		try {
			// Convert XML to JSON
			const parser = new Parser({
				explicitArray: false,
				trim: true,
			});
			const result = await parser.parseStringPromise(xmlResponse);

			// Helper function to navigate and extract nodes
			const extractNode = (data: any, node: string) => {
				const nodes: any[] = [];
				const traverse = (obj: { [x: string]: any }) => {
					if (typeof obj !== 'object') return;
					for (const key in obj) {
						if (key === node) nodes.push(obj[key]);
						traverse(obj[key]);
					}
				};
				traverse(data);
				return nodes;
			};

			if (rootNode) {
				if (Array.isArray(rootNode)) {
					// If rootNode is a list, find and extract all matching nodes
					return rootNode.flatMap((node: any) =>
						extractNode(result, node)
					);
				}
				// If rootNode is a string, find and extract the single matching node
				const extracted = extractNode(result, rootNode);
				return extracted.length === 1
					? extracted[0]
					: extracted;
			}

			return result; // Return the entire parsed result if no rootNode is specified
		} catch (error) {
			if (error instanceof Error) {
				console.error(`Error parsing XML: ${error.message}`);
			} else {
				console.error('Error parsing XML:', error);
			}
			return {};
		}
	}
}
