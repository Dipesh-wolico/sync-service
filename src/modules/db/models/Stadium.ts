import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { TeamStadium } from "./TeamsStadiums";

@Entity("stadiums")
export class Stadium {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Column({ nullable: true, length: 100 })
	name?: string;

	@Column({ nullable: true, length: 100 })
	address?: string;

	@Column({ nullable: true, length: 100 })
	city?: string;

	@Column({ nullable: true, length: 100, name: "phone_number" })
	phoneNumber?: string;

	@Column({ nullable: true, length: 100 })
	fax?: string;

	@Column({ nullable: true, type: "integer" })
	capacity?: number;

	@Column({ nullable: true, default: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, default: false, name: "is_deleted" })
	isDeleted?: boolean;

	@Column({ nullable: true, type: "json", name: "stadium_data" })
	stadiumData?: object;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@OneToMany(() => TeamStadium, (teamStadium) => teamStadium.stadium)
	assignments!: TeamStadium[];
}
