import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { PlayerStatus } from "./PlayerStatus";
import { Province } from "./Province";
import { Team } from "./Team";

@Entity("members_figc")
export class MemberFIGC {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "bigint", nullable: true, name: "serial_number" })
	serialNumber?: number;

	@Column({ length: 255, nullable: true, name: "first_name" })
	firstName?: string;

	@Column({ length: 255, nullable: true, name: "last_name" })
	lastName?: string;

	@Column({ type: "date", nullable: true, name: "birth_date" })
	birthDate?: Date;

	@Column({ type: "text", nullable: true, name: "free_transfer" })
	freeTransfer?: string;

	@Column({ type: "date", nullable: true, name: "free_transfer_date" })
	freeTransferDate?: Date;

	@Column({ type: "integer", nullable: true, name: "contract_end_year" })
	contractEndYear?: number;

	@Column({ type: "integer", nullable: true, name: "teamid" })
	teamId?: number;

	@Column({ type: "integer", nullable: true, name: "temporary_teamid" })
	temporaryTeamId?: number;

	@Column({ type: "integer", nullable: true, name: "statusid" })
	statusId?: number;

	@Column({ type: "date", nullable: true, name: "membership_date" })
	membershipDate?: Date;

	@Column({ type: "integer", nullable: true, name: "loan_option_team" })
	loanOptionTeam?: number;

	@Column({ type: "date", nullable: true, name: "loan_option_date" })
	loanOptionDate?: Date;

	@Column({ type: "integer", nullable: true, name: "trained_in_team_3_seasons" })
	trainedInTeam3Seasons?: number;

	@Column({ type: "integer", nullable: true, name: "trained_in_team_36_months" })
	trainedInTeam36Months?: number;

	@Column({ type: "integer", nullable: true, name: "trained_in_italy_3_seasons" })
	trainedInItaly3Seasons?: number;

	@Column({ type: "integer", nullable: true, name: "trained_in_italy_36_months" })
	trainedInItaly36Months?: number;

	@Column({ type: "integer", nullable: true, name: "contract_constraint" })
	contractConstraint?: number;

	@Column({ length: 255, nullable: true })
	city?: string;

	@Column({ type: "integer", nullable: true, name: "provinceid" })
	provinceId?: number;

	@Column({ length: 16, nullable: true, name: "tax_code" })
	taxCode?: string;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team?: Team;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "temporary_teamid" })
	temporaryTeam?: Team;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "loan_option_team" })
	loanOptionTeamRef?: Team;

	@ManyToOne(() => Province)
	@JoinColumn({ name: "provinceid" })
	province?: Province;

	@ManyToOne(() => PlayerStatus)
	@JoinColumn({ name: "statusid" })
	status?: PlayerStatus;
}
