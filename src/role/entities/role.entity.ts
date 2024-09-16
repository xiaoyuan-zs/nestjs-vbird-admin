import { Menu } from 'src/menu/entities/menu.entity'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Role {
	@PrimaryGeneratedColumn({ name: 'role_id' })
	roleId: number

	@Column({ name: 'role_name' })
	roleName: string

	@Column({ name: 'role_key' })
	roleKey: string

	@Column({ name: 'role_sort', default: 0 })
	roleOrder: number

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

	@ManyToMany(() => Menu)
	@JoinTable({
		name: 'role_menu_relation',
		joinColumn: { name: 'role_id', referencedColumnName: 'roleId' },
		inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'menuId' }
	})
	menus: Menu[]
}
