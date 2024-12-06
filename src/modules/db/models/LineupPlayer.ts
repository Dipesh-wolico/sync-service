import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { DocumentType } from "./DocumentType";
import { Lineup } from "./Lineup";
import { Player } from "./Player";

@Entity("lineups_players")
export class LineupPlayer {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ name: "lineupid", type: "integer", nullable: true })
	lineupId?: number;

	@Column({ name: "playerid", type: "integer", nullable: true })
	playerId?: number;

	@Column({ type: "boolean", nullable: true })
	starter?: boolean;

	@Column({ type: "boolean", nullable: true })
	captain?: boolean;

	@Column({ name: "vice_captain", type: "boolean", nullable: true })
	viceCaptain?: boolean;

	@Column({ type: "boolean", nullable: true })
	goalkeeper?: boolean;

	@Column({ name: "shirt_number", type: "integer", nullable: true })
	shirtNumber?: number;

	@Column({ name: "document_typeid", type: "integer", nullable: true })
	documentTypeId?: number;

	@Column({ name: "document_issued_by", type: "varchar", length: 255, nullable: true })
	documentIssuedBy?: string;

	@Column({ name: "document_number", type: "varchar", length: 255, nullable: true })
	documentNumber?: string;

	@Column({ name: "is_active", type: "boolean", nullable: true })
	isActive?: boolean;

	@Column({ name: "is_deleted", type: "boolean", nullable: true })
	isDeleted?: boolean;

	@CreateDateColumn({ name: "create_date", nullable: true })
	createDate?: Date;

	@UpdateDateColumn({ name: "update_date", nullable: true })
	updateDate?: Date;

	@ManyToOne(() => Lineup)
	@JoinColumn({ name: "lineupid" })
	lineup?: Lineup;

	@ManyToOne(() => Player)
	@JoinColumn({ name: "playerid" })
	player?: Player;

	@ManyToOne(() => DocumentType)
	@JoinColumn({ name: "document_typeid" })
	documentType?: DocumentType;
}
