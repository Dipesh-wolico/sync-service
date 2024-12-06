import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("seasons_periods")
export class SeasonPeriod {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Column({ length: 50 })
	period!: string;

	@Column({ type: "date", name: "start_date" })
	startDate!: Date;

	@Column({ type: "date", name: "end_date" })
	endDate!: Date;

	@Column({ name: "is_active" })
	isActive!: boolean;

	@Column({ name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
