import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("countries")
export class Country {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 255, nullable: false })
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
