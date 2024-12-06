import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("round_types")
export class RoundType {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ length: 1000, nullable: false })
	name!: string;

	@Column({ type: "boolean", nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ type: "boolean", nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
