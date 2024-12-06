import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("user_roles")
export class UserRole {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Column({ unique: true, name: "name" })
	name!: string;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
