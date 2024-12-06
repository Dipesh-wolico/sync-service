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
import { RoundType } from "./RoundType";
import { Season } from "./Season";

@Entity("rounds")
export class Round {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "integer", nullable: true, name: "seasonid" })
	seasonId!: number;

	@Column({ length: 100, nullable: false })
	name!: string;

	@Column({ type: "timestamp", nullable: false, name: "round_date" })
	roundDate!: Date;

	@Column({ type: "time", nullable: true })
	hours?: string;

	@Column({ length: 50, nullable: true, name: "round_group" })
	roundGroup?: string;

	@Column({ type: "text", nullable: true })
	notes?: string;

	@Column({ type: "boolean", nullable: true, name: "reset_counters" })
	resetCounters?: boolean;

	@Column({ type: "integer", nullable: true, name: "round_typeid" })
	roundTypeId?: number;

	@Column({ type: "json", nullable: true, name: "round_data" })
	roundData?: object;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@Column({ type: "boolean", default: true, nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ type: "boolean", default: false, nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@ManyToOne(() => Season)
	@JoinColumn({ name: "seasonid" })
	season!: Season;

	@ManyToOne(() => RoundType)
	@JoinColumn({ name: "round_typeid" })
	roundType?: RoundType;

	@OneToMany(() => Fixture, (fixture) => fixture.round)
	fixtures?: Fixture[];
}
