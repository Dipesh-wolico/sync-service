import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Team } from "./Team";

@Entity("user_team_roles")
export class UserTeamRole {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "bigint", name: "userid" })
	userId!: number;

	@Column({ type: "bigint", name: "teamid" })
	teamId!: number;

	@Column({ type: "integer", name: "roleid" })
	roleId!: number;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => User, (user) => user.userTeamRoles)
	@JoinColumn({ name: "userid" })
	user!: User;

	@ManyToOne(() => Team)
	@JoinColumn({ name: "teamid" })
	team!: Team;
}
