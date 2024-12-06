import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Province } from "./Province";

@Entity("teams")
export class Team {
	@PrimaryGeneratedColumn({ type: "integer" })
	id!: number;

	@Column({ length: 100, nullable: true, name: "serial_number" })
	serialNumber?: string;

	@Column({ length: 100, nullable: true, name: "business_name" })
	businessName?: string;

	@Column({ length: 100, nullable: true, name: "name" })
	name?: string;

	@Column({ length: 100, nullable: true, name: "nickname" })
	nickname?: string;

	@Column({ length: 100, nullable: true, name: "address" })
	address?: string;

	@Column({ length: 100, nullable: true, name: "city" })
	city?: string;

	@Column({ nullable: true, name: "provinceid" })
	provinceId?: number;

	@Column({ length: 100, nullable: true, name: "postal_code" })
	postalCode?: string;

	@Column({ length: 100, nullable: true, name: "phone_number" })
	phoneNumber?: string;

	@Column({ length: 100, nullable: true, name: "fax" })
	fax?: string;

	@Column({ length: 100, nullable: true, name: "vat" })
	vat?: string;

	@Column({ length: 100, nullable: true, name: "email" })
	email?: string;

	@Column({ length: 100, nullable: true, name: "email_member" })
	emailMember?: string;

	@Column({ length: 100, nullable: true, name: "email_pec" })
	emailPec?: string;

	@Column({ type: "text", nullable: true, name: "logo" })
	logo?: string;

	@Column({ default: true, nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ default: false, nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@Column({ type: "json", nullable: true, name: "team_data" })
	teamData?: object;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => Province)
	@JoinColumn({ name: "id" })
	province?: Province;
}
