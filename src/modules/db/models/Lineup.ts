import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Fixture } from "./Fixtures";
import { LineupPlayer } from "./LineupPlayer";
import { Team } from "./Team";

@Entity("lineups")
export class Lineup {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "fixtureid", type: "integer", nullable: true })
	fixtureId?: number;

	@Column({ name: "teamid", type: "integer", nullable: true })
	teamId?: number;

	@Column({ type: "boolean", nullable: true })
	draft?: boolean;

	@Column({ type: "boolean", nullable: true })
	closed?: boolean;

	@Column({ type: "boolean", nullable: true })
	published?: boolean;

	@Column({ name: "is_active", type: "boolean", nullable: true })
	isActive?: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: true })
	isDeleted?: boolean;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@ManyToOne(() => Fixture)
	@JoinColumn({ name: "fixtureid" })
	fixture?: Fixture;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team?: Team;

	@OneToMany(() => LineupPlayer, (lineupPlayer) => lineupPlayer.lineup)
	lineupPlayers?: LineupPlayer[];
}
