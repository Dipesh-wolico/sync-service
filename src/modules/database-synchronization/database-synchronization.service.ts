// import { Repository } from 'typeorm';
import { MemberFIGC } from '../db/models/MemberFIGC';
import { Player } from '../db/models/Player';
import { MemberLega } from '../db/models/MemberLega';
import { PGDataSource } from '../db';
import { Parser } from 'xml2js';

import { NtlmClient } from 'axios-ntlm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SeasonPeriod } from '../db/models/SeasonPeriod';
import { Season } from '../db/models/Season';
import {
	columnMapping,
	getSoapServiceData,
	soapUrlTypes,
	xmlParseType,
} from '../constants/constants';
import { Province } from '../db/models/Province';

export class SynchronizationService {
	private playerRepo: Repository<Player>;
	private memberFigcRepo: Repository<MemberFIGC>;
	private memberLegaRepo: Repository<MemberLega>;
	public seasonRepo: Repository<Season>;
	public seasonPeriodRepo: Repository<SeasonPeriod>;
	public provincesRepo: Repository<Province>;

	constructor() {
		this.playerRepo = PGDataSource.getRepository(Player);
		this.memberFigcRepo = PGDataSource.getRepository(MemberFIGC);
		this.memberLegaRepo = PGDataSource.getRepository(MemberLega);
		this.seasonPeriodRepo = PGDataSource.getRepository(SeasonPeriod);
		this.seasonRepo = PGDataSource.getRepository(Season);
		this.provincesRepo = PGDataSource.getRepository(Province);
	}

	/**
	 * Save or update a MemberFIGC record and maintain relationships.
	 * @param serialNumber - Serial number of the member.
	 * @param memberData - Data for the member to be saved or updated.
	 */
	public async persistPlayerDataCheck(
		playerSerialNumber: string,
		memberData: any,
		teamSerialNumber: string,
		teamsMapper: any
	) {
		console.log(teamsMapper);

		const extractStringValue = (data: any, key: string): string => {
			return (data[key] as unknown as { string: string }).string;
		};

		const trainedInItaly36MonthsValue = extractStringValue(
			memberData,
			'trainedInItaly36Months'
		);
		const trainedInItaly3SeasonsValue = extractStringValue(
			memberData,
			'trainedInItaly3Seasons'
		);
		const trainedInTeam36MonthsValue = extractStringValue(
			memberData,
			'trainedInTeam36Months'
		);
		const trainedInTeam3SeasonsValue = extractStringValue(
			memberData,
			'trainedInTeam3Seasons'
		);

		// var trainedInItaly36Months = false;
		// var trainedInItaly3Seasons = false;
		// var trainedInTeam36Months = false;
		// var trainedInTeam3Seasons = false;

		let trainedInItaly36Months = memberData.trainedInItaly36Months;
		let trainedInItaly3Seasons = memberData.trainedInItaly3Seasons;
		let trainedInTeam36Months = memberData.trainedInTeam36Months;
		let trainedInTeam3Seasons = memberData.trainedInTeam3Seasons;

		// const checkTrainingStatus = (
		// 	trainingData: any,
		// 	trainingValue: string,
		// 	teamSerialNumber: string
		// ): boolean => {
		// 	return (
		// 		trainingData == '1' ||
		// 		trainingData == '2' ||
		// 		trainingValue == teamSerialNumber
		// 	);

		// };

		const checkTrainingStatus = (
			trainingData: any,
			trainingValue: any,
			teamSerialNumber: any
		): any => {
			console.log('teamSerialNumber', teamSerialNumber);
			if (
				trainingData &&
				(trainingData === '1' || trainingData === '0')
			) {
				return Number(trainingData);
			} else {
				// trainingValue = teamsMapper[trainingValue];
				return Number(trainingValue);
			}
		};

		trainedInItaly36Months = checkTrainingStatus(
			memberData.trainedInItaly36Months,
			trainedInItaly36MonthsValue,
			teamSerialNumber
		);

		trainedInItaly3Seasons = checkTrainingStatus(
			memberData.trainedInItaly3Seasons,
			trainedInItaly3SeasonsValue,
			teamSerialNumber
		);

		trainedInTeam36Months = checkTrainingStatus(
			memberData.trainedInTeam36Months,
			trainedInTeam36MonthsValue,
			teamSerialNumber
		);

		trainedInTeam3Seasons = checkTrainingStatus(
			memberData.trainedInTeam3Seasons,
			trainedInTeam3SeasonsValue,
			teamSerialNumber
		);

		const existingFigcMember = await this.memberFigcRepo.findOneBy({
			serialNumber: Number(playerSerialNumber),
		});

		const provinceDetails = await this.provincesRepo.findOne({
			where: {
				code: memberData.province,
			},
			select: {
				id: true,
			},
		});

		if (existingFigcMember) {
			existingFigcMember.serialNumber = memberData.serial_number;
			existingFigcMember.firstName = memberData.first_name;
			existingFigcMember.lastName = memberData.last_name;
			existingFigcMember.birthDate = memberData.birth_date;
			existingFigcMember.freeTransfer = memberData.free_transfer;
			existingFigcMember.freeTransferDate =
				memberData.free_transfer_date;
			existingFigcMember.contractEndYear =
				memberData.contract_end_year;
			existingFigcMember.teamId = memberData.teamid;
			existingFigcMember.temporaryTeamId =
				memberData.temporary_teamid;
			existingFigcMember.statusId = memberData.statusid;
			existingFigcMember.membershipDate =
				memberData.membership_date;
			existingFigcMember.city = memberData.city;
			existingFigcMember.provinceId = provinceDetails?.id;
			existingFigcMember.taxCode = memberData.tax_code;

			// existingFigcMember.loanOptionDate = memberData.loanOptionDate;
			// existingFigcMember.loanOptionTeam = memberData.loanOptionTeam;
			// existingFigcMember.contractConstraint =
			// 	memberData.contractConstraint;
			// existingFigcMember.freeTransferCode =
			// 	memberData.freeTransferCode;
			// existingFigcMember.idoneity = memberData.idoneity;

			existingFigcMember.teamId = memberData.teamid;
			existingFigcMember.temporaryTeamId =
				memberData.temporary_teamid;

			existingFigcMember.trainedInItaly36Months =
				typeof trainedInItaly36Months === 'number' &&
				!isNaN(trainedInItaly36Months)
					? trainedInItaly36Months
					: undefined;
			existingFigcMember.trainedInItaly3Seasons =
				typeof trainedInItaly3Seasons === 'number' &&
				!isNaN(trainedInItaly3Seasons)
					? trainedInItaly3Seasons
					: undefined;
			existingFigcMember.trainedInTeam36Months =
				typeof trainedInTeam36Months === 'number' &&
				!isNaN(trainedInTeam36Months)
					? trainedInTeam36Months
					: undefined;
			existingFigcMember.trainedInTeam3Seasons =
				typeof trainedInTeam3Seasons === 'number' &&
				!isNaN(trainedInTeam3Seasons)
					? trainedInTeam3Seasons
					: undefined;

			return await this.memberFigcRepo.save(existingFigcMember);
		} else {
			// No record in FIGC, check in Lega
			const existingLegaMember = await this.memberLegaRepo.findOne({
				where: {
					serialNumber: Number(playerSerialNumber),
				},
				select: {
					id: true,
				},
			});

			const createProvinces = await this.provincesRepo.create({
				code: memberData.province,
			});
			const savedProvince = await this.provincesRepo.save(
				createProvinces
			);
			const newMemberData = {
				serialNumber: memberData.serial_number,
				firstName: memberData.first_name,
				lastName: memberData.last_name,
				birthDate: memberData.birth_date,

				freeTransfer: memberData.free_transfer,
				freeTransferDate: memberData.free_transfer_date,
				contractEndYear: memberData.contract_end_year,
				teamId: memberData.teamid,
				temporaryTeamId: memberData.temporary_teamid,
				statusId: memberData.statusid,
				membershipDate: memberData.membership_date,
				// loanOptionTeam: ,
				// loanOptionDate: ,
				trainedInTeam3Seasons:
					typeof trainedInTeam3Seasons === 'number' &&
					!isNaN(trainedInTeam3Seasons)
						? trainedInTeam3Seasons
						: undefined,
				trainedInTeam36Months:
					typeof trainedInTeam36Months === 'number' &&
					!isNaN(trainedInTeam36Months)
						? trainedInTeam36Months
						: undefined,
				trainedInItaly3Seasons:
					typeof trainedInItaly3Seasons === 'number' &&
					!isNaN(trainedInItaly3Seasons)
						? trainedInItaly3Seasons
						: undefined,
				trainedInItaly36Months:
					typeof trainedInItaly36Months === 'number' &&
					!isNaN(trainedInItaly36Months)
						? trainedInItaly36Months
						: undefined,
				// contractConstraint: ,
				city: memberData.city,
				provinceId: savedProvince.id,
				taxCode: memberData.tax_code,
				// idoneity: ,
				// freeTransferCode:
			};

			if (existingLegaMember) {
				// Create a new FIGC member and relate it to the existing Lega member via Player
				const newFigcMember = this.memberFigcRepo.create({
					...newMemberData,
				});
				const savedFigcMember = await this.memberFigcRepo.save(
					newFigcMember
				);
				// Create a new Player relationship
				const newPlayer = this.playerRepo.create({
					memberFigc: savedFigcMember,
					memberLega: existingLegaMember,
				});
				await this.playerRepo.save(newPlayer);
				return savedFigcMember;
			} else {
				// No record in Lega, create a new FIGC member and a new Player relationship
				const newFigcMember = this.memberFigcRepo.create({
					...newMemberData,
				});
				const savedFigcMember = await this.memberFigcRepo.save(
					newFigcMember
				);
				const newPlayer = this.playerRepo.create({
					memberFigc: savedFigcMember,
				});
				await this.playerRepo.save(newPlayer);
				return savedFigcMember;
			}
		}
	}

	/**
	 * Save or update a MemberFIGC record and maintain relationships.
	 * @param serialNumber - Serial number of the member.
	 * @param memberData - Datas for the member to be saved or updated.
	 */
	public async saveMemberFIGC() {
		console.log('Starting member sync service...');

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
			.limit(1)
			.getRawMany();

		const teamsMapper = seasonTeams.reduce((acc, team) => {
			acc[team.serialnumber] = team.id;
			return acc;
		}, {});
		// return teamsMapper;
		let dataplayer;
		await Promise.all(
			seasonTeams.map(async (team) => {
				dataplayer = await this.getSoapPlayerData(
					team['serialnumber']
				);
				const mappedData = await this.getMapedPlayerData(
					dataplayer
				);

				mappedData.forEach(
					(player: {
						teamid: string;
						temporary_teamid: string;
						teamId: string | number;
						temporaryTeamId: string | number;
					}) => {
						player.teamid = teamsMapper[player.teamid];
						player.temporary_teamid =
							teamsMapper[player.temporary_teamid];
					}
				);

				await Promise.all(
					mappedData.map(async (player: any) => {
						await this.persistPlayerDataCheck(
							player['serial_number'],
							player,
							team['serialnumber'],
							teamsMapper
						);
					})
				);
			})
		);

		return {
			data: 'success',
		};
	}

	public async getSoapPlayerData(serialNumber: number) {
		const getPlayersForTeam = await this.getSoapServiceData(
			serialNumber,
			soapUrlTypes.TEAM_PLAYERS_DATA
		);

		const combinedPlayerData = [];
		const batchSize = 1; // Process 2 players at a time
		const delayMs = 5000; // 5 seconds delay
		const traverseLength = 1;
		for (let i = 0; i < traverseLength; i += batchSize) {
			const batch = getPlayersForTeam.slice(i, i + batchSize);

			const batchResults = await Promise.all(
				batch.map(async (player: any) => {
					const playerSerialNumber = player['MATRICOLA'];

					// player details SOAP service data
					const playerData = await this.getSoapServiceData(
						playerSerialNumber,
						soapUrlTypes.PLAYER_DETAILS_DATA
					);

					const trainedInItaly36Months =
						await this.getSoapServiceData(
							playerSerialNumber,
							soapUrlTypes.TRAINED_IN_ITALY_36_MONTHS
						);

					const trainedInItaly3Seasons =
						await this.getSoapServiceData(
							playerSerialNumber,
							soapUrlTypes.TRAINED_IN_ITALY_3_SEASONS
						);

					const trainedInTeam36Months =
						await this.getSoapServiceData(
							playerSerialNumber,
							soapUrlTypes.TRAINED_IN_TEAM_36_MONTHS
						);

					const trainedInTeam3Seasons =
						await this.getSoapServiceData(
							playerSerialNumber,
							soapUrlTypes.TRAINED_IN_TEAM_3_SEASONS
						);

					return {
						...player,
						...playerData,
						trainedInItaly36Months,
						trainedInItaly3Seasons,
						trainedInTeam36Months,
						trainedInTeam3Seasons,
					};
				})
			);

			combinedPlayerData.push(...batchResults);

			// Add a delay of 5 seconds between batches
			if (i + batchSize < getPlayersForTeam.length) {
				await new Promise((resolve) =>
					setTimeout(resolve, delayMs)
				);
			}
		}

		return combinedPlayerData;
	}

	public async getSoapServiceData(
		serialNumber: number,
		soapUrlType: string
	) {
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
				data: `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body>${
					soapUrlType === soapUrlTypes.TEAM_PLAYERS_DATA
						? getSoapServiceData.teamPlayersData(
								serialNumber
						  )
						: soapUrlType ===
						  soapUrlTypes.PLAYER_DETAILS_DATA
						? getSoapServiceData.playerDetailsData(
								serialNumber
						  )
						: soapUrlType ===
						  soapUrlTypes.TRAINED_IN_ITALY_36_MONTHS
						? getSoapServiceData.trainedInItaly36Months(
								serialNumber
						  )
						: soapUrlType ===
						  soapUrlTypes.TRAINED_IN_ITALY_3_SEASONS
						? getSoapServiceData.trainedInItaly3Seasons(
								serialNumber
						  )
						: soapUrlType ===
						  soapUrlTypes.TRAINED_IN_TEAM_36_MONTHS
						? getSoapServiceData.trainedInTeam36Months(
								serialNumber
						  )
						: soapUrlType ===
						  soapUrlTypes.TRAINED_IN_TEAM_3_SEASONS
						? getSoapServiceData.trainedInTeam3Seasons(
								serialNumber
						  )
						: ''
				}</soap12:Body></soap12:Envelope>`,
			});
			const xmlTypeParam =
				soapUrlType === soapUrlTypes.TEAM_PLAYERS_DATA
					? xmlParseType.NEW_DATA_SET
					: soapUrlType === soapUrlTypes.PLAYER_DETAILS_DATA
					? xmlParseType.NEW_DATA_SET
					: soapUrlType ===
					  soapUrlTypes.TRAINED_IN_ITALY_36_MONTHS
					? xmlParseType.TRAINED_IN_ITALY_36_MONTHS
					: soapUrlType ===
					  soapUrlTypes.TRAINED_IN_ITALY_3_SEASONS
					? xmlParseType.TRAINED_IN_ITALY_3_SEASONS
					: soapUrlType ===
					  soapUrlTypes.TRAINED_IN_TEAM_36_MONTHS
					? xmlParseType.TRAINED_IN_TEAM_36_MONTHS
					: soapUrlType ===
					  soapUrlTypes.TRAINED_IN_TEAM_3_SEASONS
					? xmlParseType.TRAINED_IN_TEAM_3_SEASONS
					: '';
			const parsedXml = await this.parseXmlToJson(
				resp.data,
				xmlTypeParam
			);

			if (
				soapUrlType === soapUrlTypes.TEAM_PLAYERS_DATA ||
				soapUrlType === soapUrlTypes.PLAYER_DETAILS_DATA
			) {
				return parsedXml['Table1'];
			} else {
				return parsedXml;
			}
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
				return extracted?.length === 1
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

	public async getMapedPlayerData(dataplayer: any) {
		const mappedData = dataplayer.map(
			(item: { [s: string]: unknown } | ArrayLike<unknown>) => {
				const mappedItem: { [key: string]: any } = {};
				for (const [key, value] of Object.entries(item)) {
					if (
						columnMapping[key as string] ||
						columnMapping[key as string] === ''
					) {
						mappedItem[columnMapping[key]] = value;
					} else if (
						(typeof value === 'object' &&
							!Array.isArray(value)) ||
						[
							'trainedInItaly36Months',
							'trainedInItaly3Seasons',
							'trainedInTeam36Months',
							'trainedInTeam3Seasons',
						].includes(key)
					) {
						mappedItem[key] = value;
					}
				}
				return mappedItem;
			}
		);
		return mappedData;
	}

	async runSync(): Promise<void> {
		try {
			await this.saveMemberFIGC(); // Run the service
			console.log('Starting next execution...');
			await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
			await this.runSync(); // Recursively call the same function
		} catch (error) {
			console.error('Error in runSync:', error);
		}
	}
}
