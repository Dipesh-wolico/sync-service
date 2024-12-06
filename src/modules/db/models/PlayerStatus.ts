import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("player_status")
export class PlayerStatus {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	name!: string;

	@Column({ type: "varchar", length: 5, nullable: true })
	type?: string;

	@Column({ type: "boolean", nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ type: "boolean", nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
