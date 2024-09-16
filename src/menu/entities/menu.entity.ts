import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Menu {
	@PrimaryGeneratedColumn({ name: 'menu_id' })
	menuId: number

	@Column({ name: 'menu_name' })
	menuName: string

	@Column({ name: 'parent_id', default: 0 })
	parentId: number

	@Column({ name: 'menu_order', default: 0 })
	menuOrder: number

	@Column()
	path: string

	@Column()
	component: string

	@Column({ name: 'menu_type', default: 'C' })
	menuType: string

	@Column({ name: 'permissions', default: '' })
	permissions: string

	@Column({ default: '' })
	icon: string

	@Column({ default: 0 })
	status: number

	@Column({ default: 0 })
	visible: number

	@Column({ default: '' })
	remark: string

	@Column({ name: 'create_by', default: 'admin' })
	createBy: string

	@Column({ name: 'update_by', default: 'admin' })
	updateBy: string

	@CreateDateColumn({ name: 'create_time', type: 'timestamp' })
	createTime: Date

	@UpdateDateColumn({ name: 'update_time', type: 'timestamp' })
	updateTime: Date
}
