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

	async findAll() {
		return await this.userRepository.find()
	}

	/**
	 * 根据用户名查询用户
	 * @param username 用户名
	 * @returns
	 */
	async findUserByUsername(username: string) {
		return await this.userRepository.findOneBy({ username })
	}

	initData() {
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

		const menu = new Menu()
		menu.menuName = '系统管理'
		menu.path = 'system'
		menu.component = 'Layout'
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
