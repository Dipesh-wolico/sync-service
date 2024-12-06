import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("player_roles")
export class PlayerRole {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "varchar", length: 255, nullable: false })
	name!: string;

	@Column({ type: "varchar", length: 50, nullable: true })
	code?: string;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
