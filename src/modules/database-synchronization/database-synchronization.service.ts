import { Repository } from 'typeorm';
import { MemberFIGC } from '../db/models/MemberFIGC';
import { Player } from '../db/models/Player';
import { MemberLega } from '../db/models/MemberLega';
import { PGDataSource } from '../db';

export class SynchronizationService {
	private playerRepo: Repository<Player>;
	private memberFigcRepo: Repository<MemberFIGC>;
	private memberLegaRepo: Repository<MemberLega>;

	constructor() {
		this.playerRepo = PGDataSource.getRepository(Player);
		this.memberFigcRepo = PGDataSource.getRepository(MemberFIGC);
		this.memberLegaRepo = PGDataSource.getRepository(MemberLega);
	}

	/**
	 * Save or update a MemberFIGC record and maintain relationships.
	 * @param serialNumber - Serial number of the member.
	 * @param memberData - Data for the member to be saved or updated.
	 */
	public async saveMemberFIGC(
		serialNumber: string,
		memberData: Partial<MemberFIGC>
	): Promise<MemberFIGC> {
		const existingFigcMember = await this.memberFigcRepo.findOneBy({
			serialNumber: Number(serialNumber),
		});

		if (existingFigcMember) {
			// Update the existing FIGC member
			this.memberFigcRepo.merge(existingFigcMember, memberData);
			return await this.memberFigcRepo.save(existingFigcMember);
		} else {
			// No record in FIGC, check in Lega
			const existingLegaMember =
				await this.memberLegaRepo.findOneBy({
					serialNumber: Number(serialNumber),
				});

			if (existingLegaMember) {
				// Create a new FIGC member and relate it to the existing Lega member via Player
				const newFigcMember = this.memberFigcRepo.create({
					serialNumber,
					...memberData,
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
					serialNumber,
					...memberData,
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
}
