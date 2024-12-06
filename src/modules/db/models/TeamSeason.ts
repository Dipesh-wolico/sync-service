import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Team } from "./Team";
import { Season } from "./Season";

@Entity("teams_seasons")
export class TeamSeason {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "seasonid", type: "integer", nullable: true })
	seasonId?: number;

	@Column({ name: "teamid", type: "integer", nullable: false })
	teamId!: number;

	@Column({
		name: "revenue_debt_ratio",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	revenueDebtRatio?: number;

	@Column({ name: "payment", type: "decimal", precision: 19, scale: 4, nullable: true })
	payment?: number;

	@Column({
		name: "league_admission_balance",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	leagueAdmissionBalance?: number;

	@Column({ name: "certification_date", type: "timestamp", nullable: true })
	certificationDate?: Date;

	@Column({ name: "penalty_points", type: "integer", nullable: true })
	penaltyPoints?: number;

	@Column({
		name: "credit_transfer_year1",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	creditTransferYear1?: number;

	@Column({
		name: "credit_transfer_year2",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	creditTransferYear2?: number;

	@Column({
		name: "credit_transfer_year3",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	creditTransferYear3?: number;

	@Column({
		name: "credit_transfer_year4",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	creditTransferYear4?: number;

	@Column({
		name: "credit_transfer_year5",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	creditTransferYear5?: number;

	@Column({
		name: "guarantees_delivered_year1",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	guaranteesDeliveredYear1?: number;

	@Column({
		name: "guarantees_delivered_year2",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	guaranteesDeliveredYear2?: number;

	@Column({
		name: "guarantees_delivered_year3",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	guaranteesDeliveredYear3?: number;

	@Column({
		name: "guarantees_delivered_year4",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	guaranteesDeliveredYear4?: number;

	@Column({
		name: "guarantees_delivered_year5",
		type: "decimal",
		precision: 19,
		scale: 4,
		nullable: true,
	})
	guaranteesDeliveredYear5?: number;

	@Column({ name: "teams_seasons_data", type: "json", nullable: true })
	teamsSeasonsData?: object;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@Column({ name: "is_active", type: "boolean", nullable: true, default: true })
	isActive?: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: true, default: false })
	isDeleted?: boolean;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team!: Team;

	@ManyToOne(() => Season)
	@JoinColumn({ name: "seasonid" })
	season?: Season;
}
