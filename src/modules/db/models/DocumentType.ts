import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("document_types")
export class DocumentType {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 250, nullable: false })
	name!: string;

	@Column({ nullable: false, name: "is_active" })
	isActive!: boolean;

	@Column({ nullable: false, name: "is_deleted" })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;
}
