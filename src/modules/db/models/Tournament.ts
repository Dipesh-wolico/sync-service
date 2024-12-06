import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Season } from "./Season";

@Entity("tournaments")
export class Tournament {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ length: 250, nullable: false })
	name!: string;

	@Column({ nullable: false, name: "serie_a" })
	serieA!: boolean;

	@Column({ nullable: false, name: "serie_b" })
	serieB!: boolean;

	@Column({ nullable: false, name: "youth_competition" })
	youthCompetition!: boolean;

	@Column({ nullable: false, name: "roster_check" })
	rosterCheck!: boolean;

	@Column({ length: 5, nullable: true, name: "federal_code" })
	federalCode?: string;

	@Column({ type: "integer", nullable: true })
	points?: number;

	@Column({ nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@OneToMany(() => Season, (season) => season.tournament)
	seasons!: Season[];
}
