import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Player } from "./Player";
import { Squad } from "./Squad";

@Entity("squad_players")
export class SquadPlayer {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "squadid", type: "integer", nullable: true })
	squadId?: number;

	@Column({ name: "playerid", type: "integer", nullable: true })
	playerId?: number;

	@Column({ name: "shirt_number", type: "integer", nullable: true })
	shirtNumber?: number;

	@Column({ name: "list_type", type: "integer", nullable: true })
	listType?: number;

	@Column({ name: "is_active", type: "boolean", nullable: false })
	isActive!: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: false })
	isDeleted!: boolean;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@ManyToOne(() => Squad)
	@JoinColumn({ name: "squadid" })
	squad?: Squad;

	@ManyToOne(() => Player)
	@JoinColumn({ name: "playerid" })
	player?: Player;
}
