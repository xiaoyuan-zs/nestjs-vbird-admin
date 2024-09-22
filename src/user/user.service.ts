import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { EntityManager, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcryptjs'
import { Result } from 'src/common/result/result'
import { Role } from 'src/role/entities/role.entity'
import { Menu } from 'src/menu/entities/menu.entity'

@Injectable()
export class UserService {
	constructor(
		// 使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService 中， 相当于Java中的 Mapper
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly configService: ConfigService,

		@InjectEntityManager()
		private readonly entityManager: EntityManager
	) {}

	/**
	 * 创建用户
	 * @param createUserDto
	 */
	async create(createUserDto: CreateUserDto) {
		const username = createUserDto.username
		const user = await this.findUserByUsername(username)
		if (user) {
			return Result.error(HttpStatus.INTERNAL_SERVER_ERROR, '用户名已存在')
		}
		const password = createUserDto.password
		// 生成加密盐
		const salt = await bcrypt.genSalt(10)
		// 进行加密
		const hash = await bcrypt.hash(password, salt)
		createUserDto.password = hash
		this.userRepository.save(createUserDto)
		return Result.success()
	}

	/**
	 * 查询用户列表
	 * @returns
	 */
	async findAll() {
		// this.initData()
		return this.userRepository.find({
			select: ['userId', 'username', 'nickname', 'email', 'mobilePhone', 'avatar', 'remark', 'status', 'createTime', 'updateTime']
		})
	}

	/**
	 * 根据用户名查询用户
	 * @param username 用户名
	 * @returns
	 */
	async findUserByUsername(username: string) {
		return await this.userRepository.findOneBy({ username })
	}

	/**
	 * 根据用户 id 查询用户信息
	 * @param id
	 * @returns
	 */
	findOne(id: number) {
		return this.userRepository.find({
			where: {
				userId: id
			},
			select: ['userId', 'username', 'nickname', 'email', 'mobilePhone', 'avatar', 'remark', 'createTime', 'updateTime'],
			relations: ['roles']
		})
	}

	update(updateUserDto: UpdateUserDto) {
		return 0
	}

	remove(id: number) {
		return this.userRepository.delete(id)
	}

	async initData() {
		const user = new User()
		user.username = 'admin'
		user.nickname = 'admin'
		user.password = 'admin123'
		user.email = '13333333333@qq.com'
		user.mobilePhone = '13333333333'

		const user1 = new User()
		user1.username = 'common'
		user1.nickname = 'common'
		user1.password = 'admin123'
		user1.email = '13333333334@qq.com'
		user1.mobilePhone = '13333333334'

		const user2 = new User()
		user2.username = 'simple'
		user2.nickname = 'simple'
		user2.password = 'admin123'
		user2.email = '13333333335@qq.com'
		user2.mobilePhone = '13333333335'

		const role = new Role()
		role.roleName = 'admin'
		role.roleKey = 'admin'
		role.remark = '管理员'

		const role1 = new Role()
		role1.roleName = 'common'
		role1.roleKey = 'common'
		role1.remark = '普通用户'

		const role2 = new Role()
		role2.roleName = 'simple'
		role2.roleKey = 'simple'
		role2.remark = '简单用户'

		const menu = new Menu()
		menu.menuName = '系统管理'
		menu.path = 'system'
		menu.component = 'Layout'
		menu.menuType = 'C'
		menu.icon = 'xxx'
		menu.remark = '系统管理'

		const menu1 = new Menu()
		menu1.menuName = '用户管理'
		menu1.path = 'user'
		menu1.component = 'system/user/index'
		menu1.menuType = 'M'
		menu1.icon = 'xxx'
		menu1.remark = '用户管理'

		const menu2 = new Menu()
		menu2.menuName = '角色管理'
		menu2.path = 'role'
		menu2.component = 'system/role/index'
		menu2.menuType = 'M'
		menu2.icon = 'xxx'
		menu2.remark = '角色管理'

		const menu3 = new Menu()
		menu3.menuName = '菜单管理'
		menu3.path = 'menu'
		menu3.component = 'system/menu/index'
		menu3.menuType = 'M'
		menu3.icon = 'xxx'
		menu3.remark = '菜单管理'

		// 添加 role 和 menu 关系
		role.menus = [menu, menu1, menu2, menu3]
		role1.menus = [menu, menu1, menu2]
		role2.menus = [menu, menu1]

		// 添加 user 和 role 关系
		user.roles = [role]
		user1.roles = [role1]
		user2.roles = [role2]

		// 保存数据
		await this.entityManager.save(Menu, [menu, menu1, menu2, menu3])
		await this.entityManager.save(Role, [role, role1, role2])
		await this.entityManager.save(User, [user, user1, user2])
	}
}
