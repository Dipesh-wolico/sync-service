import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { DocumentType } from "./DocumentType";
import { Province } from "./Province";
import { StaffAssignment } from "./StaffAssignment";
import { StaffCategories } from "./StaffCategories";
import { StaffQualification } from "./StaffQualifications";

@Entity("staff")
export class Staff {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: true, name: "document_typeid", type: "integer" })
	documentTypeId?: number;

	@Column({ length: 250, nullable: true, name: "document_issued_by" })
	documentIssuedBy?: string;

	@Column({ length: 50, nullable: true, name: "document_number" })
	documentNumber?: string;

	@Column({ type: "bigint", nullable: true, name: "serial_number" })
	serialNumber?: number;

	@Column({ length: 100, nullable: true, name: "last_name" })
	lastName?: string;

	@Column({ length: 100, nullable: true, name: "first_name" })
	firstName?: string;

	@Column({ type: "date", nullable: true, name: "birth_date" })
	birthDate?: Date;

	@Column({ length: 150, nullable: true, name: "address" })
	address?: string;

	@Column({ type: "integer", nullable: true, name: "postal_code" })
	postalCode?: number;

	@Column({ length: 100, nullable: true, name: "city" })
	city?: string;

	@Column({ nullable: true, name: "provinceid", type: "integer" })
	provinceId?: number;

	@Column({ nullable: true, name: "staff_categoryid", type: "integer" })
	staffCategoryId?: number;

	@Column({ length: 50, nullable: true, name: "tax_code" })
	taxCode?: string;

	@Column({ type: "date", nullable: true, name: "card_date" })
	cardDate?: Date;

	@Column({ nullable: true, name: "staff_qualificationid", type: "integer" })
	staffQualificationId?: number;

	@Column({ nullable: true, name: "staff_assignmentid", type: "integer" })
	staffAssignmentId?: number;

	@Column({ type: "text", nullable: true, name: "photo" })
	photo?: string;

	@Column({ type: "text", nullable: true, name: "document" })
	document?: string;

	@Column({ nullable: false, name: "is_active", default: true })
	isActive!: boolean;

	@Column({ nullable: false, name: "is_deleted", default: false })
	isDeleted!: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date", default: () => "CURRENT_TIMESTAMP" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => DocumentType)
	@JoinColumn({ name: "document_typeid" })
	documentType?: DocumentType;

	@ManyToOne(() => Province)
	@JoinColumn({ name: "provinceid" })
	province?: Province;

	@ManyToOne(() => StaffAssignment)
	@JoinColumn({ name: "staff_assignmentid" })
	staffAssignment?: StaffAssignment;

	@ManyToOne(() => StaffCategories)
	@JoinColumn({ name: "staff_categoryid" })
	staffCategory?: StaffCategories;

	@ManyToOne(() => StaffQualification)
	@JoinColumn({ name: "staff_qualificationid" })
	staffQualification?: StaffQualification;
}
