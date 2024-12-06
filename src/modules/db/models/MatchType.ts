import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("match_types")
export class MatchType {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false, name: "name" })
	name!: string;

	@Column({ type: "boolean", nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ type: "boolean", nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: false, name: "create_date" })
	createDate!: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
