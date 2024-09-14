import { Role } from 'src/role/entities/role.entity'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	userId: number

	@Column()
	nickname: string

	@Column()
	username: string

	@Column()
	password: string

	@Column({ default: '' })
	email: string

	@Column({ default: '' })
	avatar: string

	@Column({ name: 'phone_number', default: '' })
	phoneNumber: string

	@Column({ name: 'user_order' })
	userOrder: number

	@Column({ default: 0 })
	status: number

	@Column()
	remark: string

	@Column({ name: 'create_by', default: 'admin' })
	createBy: string

	@Column({ name: 'update_by', default: 'admin' })
	updateBy: string

	@CreateDateColumn({ name: 'create_time', type: 'timestamp' })
	createTime: Date

	@UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
	updateTime: Date

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'user_role_relation',
		// 修改关联表里面的 列名称， 对应的是 当前实体的属性名称
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'userId'
		},
		inverseJoinColumn: {
			name: 'role_id',
			referencedColumnName: 'roleId'
		}
	})
	roles: Role[]
}
