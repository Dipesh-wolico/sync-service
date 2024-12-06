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
import { Round } from "./Round";
import { MatchType } from "./MatchType";
import { Stadium } from "./Stadium";
import { MatchEndType } from "./MatchEndType";

@Entity("fixtures")
export class Fixture {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "team1id", type: "integer", nullable: false })
	team1Id!: number;

	@Column({ name: "team2id", type: "integer", nullable: false })
	team2Id!: number;

	@Column({ name: "roundid", type: "integer", nullable: false })
	roundId!: number;

	@Column({ name: "match_date", type: "timestamp", nullable: true })
	matchDate?: Date;

	@Column({ name: "match_time", type: "time", nullable: true })
	matchTime?: string;

	@Column({ name: "match_typeid", type: "integer", nullable: false })
	matchTypeId!: number;

	@Column({ name: "postponed", type: "boolean", nullable: false })
	postponed!: boolean;

	@Column({ name: "before_after_date", type: "timestamp", nullable: true })
	beforeAfterDate?: Date;

	@Column({ name: "before_after_time", type: "time", nullable: true })
	beforeAfterTime?: string;

	@Column({ name: "recovery_date", type: "timestamp", nullable: true })
	recoveryDate?: Date;

	@Column({ name: "recovery_time", type: "time", nullable: true })
	recoveryTime?: string;

	@Column({ name: "played_time", type: "time", nullable: true })
	playedTime?: string;

	@Column({ name: "played_date", type: "timestamp", nullable: true })
	playedDate?: Date;

	@Column({ name: "stadiumid", type: "integer", nullable: true })
	stadiumId?: number;

	@Column({ name: "team1_goals", type: "integer", nullable: true })
	team1Goals?: number;

	@Column({ name: "team2_goals", type: "integer", nullable: true })
	team2Goals?: number;

	@Column({ name: "forfeit", type: "integer", nullable: true })
	forfeit?: number;

	@Column({ name: "match_end_typeid", type: "integer", nullable: true })
	matchEndTypeId?: number;

	@Column({ name: "first_half_stoppage_time", type: "integer", nullable: true })
	firstHalfStoppageTime?: number;

	@Column({ name: "second_half_stoppage_time", type: "integer", nullable: true })
	secondHalfStoppageTime?: number;

	@Column({ name: "document_link", type: "varchar", length: 500, nullable: true })
	documentLink?: string;

	@Column({ name: "fixture_data", type: "json", nullable: true })
	fixtureData?: object;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@Column({ name: "is_active", type: "boolean", nullable: true })
	isActive?: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: true })
	isDeleted?: boolean;

	@Column({ name: "half_time", type: "integer", nullable: true })
	halfTime?: number;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "team1id" })
	team1!: Team;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "team2id" })
	team2!: Team;

	@ManyToOne(() => Round)
	@JoinColumn({ name: "roundid" })
	round!: Round;

	@ManyToOne(() => MatchType)
	@JoinColumn({ name: "match_typeid" })
	matchType!: MatchType;

	@ManyToOne(() => Stadium)
	@JoinColumn({ name: "stadiumid" })
	stadium?: Stadium;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "forfeit" })
	forfeitTeam?: Team;

	@ManyToOne(() => MatchEndType)
	@JoinColumn({ name: "match_end_typeid" })
	matchEndType?: MatchEndType;
}
