import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("provinces")
export class Province {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ length: 50, nullable: true, name: "code" })
	code?: string;

	@Column({ default: true, nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ default: false, nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@Column({ type: "json", nullable: true, name: "province_data" })
	provinceData?: object;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
