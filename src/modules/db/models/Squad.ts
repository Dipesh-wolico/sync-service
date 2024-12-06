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
import { Season } from "./Season";
import { SquadPlayer } from "./SquadPlayer";
import { Team } from "./Team";

@Entity("squads")
export class Squad {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "seasonid", type: "integer", nullable: true })
	seasonId?: number;

	@Column({ name: "teamid", type: "integer", nullable: true })
	teamId?: number;

	@Column({ type: "boolean", nullable: false })
	draft!: boolean;

	@Column({ type: "boolean", nullable: false })
	published!: boolean;

	@Column({ type: "boolean", nullable: false })
	current!: boolean;

	@Column({ name: "published_date", type: "timestamp", nullable: true })
	publishedDate?: Date;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@Column({ name: "is_active", type: "boolean", nullable: false })
	isActive!: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: false })
	isDeleted!: boolean;

	@ManyToOne(() => Season)
	@JoinColumn({ name: "seasonid" })
	season?: Season;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team?: Team;

	@OneToMany(() => SquadPlayer, (squadPlayer) => squadPlayer.squad)
	squadPlayers?: SquadPlayer[];
}
