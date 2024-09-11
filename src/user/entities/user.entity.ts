import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	userId: number

	@Column()
	nickname: string

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	email: string

	@Column()
	avatar: string

	@Column()
	phoneNumber: string

	@Column({ default: 'admin' })
	createBy: string

	@Column({ default: 'admin' })
	updateBy: string

	@CreateDateColumn({ type: 'timestamp' })
	createTime: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updateTime: Date
}
