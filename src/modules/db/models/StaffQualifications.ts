import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("staff_qualifications")
export class StaffQualification {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 250, nullable: false })
	name!: string;

	@Column({ nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({
		nullable: true,
		name: "create_date",
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createDate?: Date;

	@UpdateDateColumn({
		nullable: true,
		name: "update_date",
		type: "timestamp",
	})
	updateDate?: Date;
}
