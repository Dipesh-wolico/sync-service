import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { UserRole } from "./UserRole";
import { UserTeamRole } from "./UserTeamRole";

@Entity("users", { schema: "public" })
export class User {
	@PrimaryGeneratedColumn("increment")
	id!: number;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: true, name: "first_name" })
	firstName?: string;

	@Column({ nullable: true, name: "last_name" })
	lastName?: string;

	@Column({ nullable: true, length: 50, name: "tax_code" })
	taxCode?: string;

	@Column({ nullable: true, name: "identity" })
	identity?: string;

	@ManyToOne(() => UserRole, { nullable: true })
	@JoinColumn({ name: "user_roleid" })
	userRole?: UserRole;

	@Column({ nullable: true, name: "user_roleid" })
	userRoleId?: number;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@OneToMany(() => UserTeamRole, (userTeamRole) => userTeamRole.user)
	userTeamRoles?: UserTeamRole[];
}
