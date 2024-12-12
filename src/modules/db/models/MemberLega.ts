import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Country } from './Country';
import { PlayerRole } from './PlayerRole';
import { PlayerStatus } from './PlayerStatus';
import { Province } from './Province';
import { Team } from './Team';

@Entity('members_lega')
export class MemberLega {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'bigint', nullable: true, name: 'serial_number' })
	serialNumber?: number;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
		name: 'first_name',
	})
	firstName?: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
		name: 'last_name',
	})
	lastName?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	nickname?: string;

	@Column({ type: 'date', nullable: true, name: 'birth_date' })
	birthDate?: Date;

	@Column({ type: 'varchar', length: 255, nullable: true })
	address?: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: true,
		name: 'postal_code',
	})
	postalCode?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	city?: string;

	@Column({ type: 'integer', nullable: true, name: 'provinceid' })
	provinceId?: number;

	@Column({ type: 'integer', nullable: true, name: 'player_statusid' })
	playerStatusId?: number;

	@Column({ type: 'integer', nullable: true, name: 'countryid' })
	countryId?: number;

	@Column({ type: 'integer', nullable: true, name: 'citizenshipid' })
	citizenshipId?: number;

	@Column({ type: 'integer', nullable: true, name: 'statusid' })
	statusId?: number;

	@Column({ type: 'varchar', length: 50, nullable: true, name: 'tax_code' })
	taxCode?: string;

	@Column({ type: 'text', nullable: true })
	photo?: string;

	@Column({ type: 'integer', nullable: true, name: 'player_roleid' })
	playerRoleId?: number;

	@Column({
		type: 'integer',
		nullable: true,
		name: 'trained_in_italy_3_seasons',
	})
	trainedInItaly3Seasons?: number;

	@Column({
		type: 'integer',
		nullable: true,
		name: 'trained_in_italy_36_months',
	})
	trainedInItaly36Months?: number;

	@Column({
		type: 'integer',
		nullable: true,
		name: 'trained_in_team_3_seasons',
	})
	trainedInTeam3Seasons?: number;

	@Column({
		type: 'integer',
		nullable: true,
		name: 'trained_in_team_36_months',
	})
	trainedInTeam36Months?: number;

	@Column({ type: 'boolean', nullable: false, name: 'is_active' })
	isActive!: boolean;

	@Column({ type: 'boolean', nullable: false, name: 'is_deleted' })
	isDeleted!: boolean;

	@Column({ type: 'integer', nullable: true, name: 'temporary_teamid' })
	temporaryTeamId?: number;

	@Column({ type: 'integer', nullable: true, name: 'teamid' })
	teamId?: number;

	@CreateDateColumn({ nullable: true, name: 'create_date' })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: 'update_date' })
	updateDate?: Date;

	@ManyToOne(() => Province)
	@JoinColumn({ name: 'provinceid' })
	province?: Province;

	@ManyToOne(() => PlayerStatus)
	@JoinColumn({ name: 'player_statusid' })
	playerStatus?: PlayerStatus;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'countryid' })
	country?: Country;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'citizenshipid' })
	citizenship?: Country;

	@ManyToOne(() => PlayerStatus)
	@JoinColumn({ name: 'statusid' })
	status?: PlayerStatus;

	@ManyToOne(() => PlayerRole)
	@JoinColumn({ name: 'player_roleid' })
	playerRole?: PlayerRole;

	@ManyToOne(() => Team)
	@JoinColumn({ name: 'teamid' })
	team?: Team;

	@ManyToOne(() => Team)
	@JoinColumn({ name: 'temporary_teamid' })
	temporaryTeam?: Team;

	@Column({ length: 255, nullable: true, name: 'idoneity' })
	idoneity?: string;

	@Column({ length: 255, nullable: true, name: 'free_transfer_code' })
	freeTransferCode?: string;
}
