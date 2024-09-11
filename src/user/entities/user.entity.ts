import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
