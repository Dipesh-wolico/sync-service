import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { MemberFIGC } from "./MemberFIGC";
import { MemberLega } from "./MemberLega";

@Entity("players")
export class Player {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "bigint", nullable: true, name: "members_legaid" })
	membersLegaId?: number;

	@Column({ type: "bigint", nullable: true, name: "members_figcid" })
	membersFigcId?: number;

	@Column({ nullable: true, name: "is_active" })
	isActive?: boolean;

	@Column({ nullable: true, name: "is_deleted" })
	isDeleted?: boolean;

	@CreateDateColumn({ nullable: true, name: "create_date" })
	createDate?: Date;

	@UpdateDateColumn({ nullable: true, name: "update_date" })
	updateDate?: Date;

	@ManyToOne(() => MemberLega)
	@JoinColumn({ name: "members_legaid" })
	memberLega?: MemberLega;

	@ManyToOne(() => MemberFIGC)
	@JoinColumn({ name: "members_figcid" })
	memberFigc?: MemberFIGC;
}
