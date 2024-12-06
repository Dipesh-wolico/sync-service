import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Round } from "./Round";
import { SeasonPeriod } from "./SeasonPeriod";
import { Team } from "./Team";
import { TeamSeason } from "./TeamSeason";
import { Tournament } from "./Tournament";

@Entity("seasons")
export class Season {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ length: 250, name: "custom_name" })
	customName!: string;

	@Column({ length: 250, nullable: true })
	logo?: string;

	@Column({ name: "season_periodid" })
	seasonPeriodId!: number;

	@Column({ name: "tournamentid" })
	tournamentId!: number;

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		nullable: true,
		name: "federal_minimum_first_tier",
	})
	federalMinimumFirstTier?: number;

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		nullable: true,
		name: "federal_minimum_second_tier",
	})
	federalMinimumSecondTier?: number;

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		nullable: true,
		name: "federal_minimum_third_tier",
	})
	federalMinimumThirdTier?: number;

	@Column({
		type: "decimal",
		precision: 10,
		scale: 2,
		nullable: true,
		name: "federal_minimum_training",
	})
	federalMinimumTraining?: number;

	@Column({ type: "json", nullable: true })
	data?: object;

	@Column({ name: "is_active" })
	isActive!: boolean;

	@Column({ name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => SeasonPeriod)
	@JoinColumn({ name: "season_periodid" })
	seasonPeriod!: SeasonPeriod;

	@OneToMany(() => Round, (round) => round.season)
	rounds!: Round[];

	@ManyToMany(() => Team)
	@JoinTable({
		name: "teams_seasons",
		joinColumn: {
			name: "seasonid",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "teamid",
			referencedColumnName: "id",
		},
	})
	teams!: Team[];

	@OneToMany(() => TeamSeason, (teamSeason) => teamSeason.season)
	teamsSeasons!: TeamSeason[];

	@ManyToOne(() => Tournament, (tournament) => tournament.seasons)
	@JoinColumn({ name: "tournamentid" })
	tournament!: Tournament;
}
