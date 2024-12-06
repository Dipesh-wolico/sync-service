import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Stadium } from "./Stadium";
import { Team } from "./Team";

@Entity("teams_stadiums")
export class TeamStadium {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Column({ nullable: true, name: "teamid" })
	teamId?: number;

	@Column({ nullable: true, name: "stadiumid" })
	stadiumId?: number;

	@Column({ nullable: true, type: "date", name: "date_from" })
	dateFrom?: Date;

	@Column({ nullable: true, type: "date", name: "date_to" })
	dateTo?: Date;

	@Column({ nullable: false })
	current!: boolean;

	@Column({ nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team?: Team;

	@ManyToOne(() => Stadium)
	@JoinColumn({ name: "stadiumid" })
	stadium?: Stadium;
}
